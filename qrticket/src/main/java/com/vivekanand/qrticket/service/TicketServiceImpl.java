package com.vivekanand.qrticket.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HexFormat;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vivekanand.qrticket.dto.TicketInfo;
import com.vivekanand.qrticket.dto.TotalTicket;
import com.vivekanand.qrticket.entity.EntryLog;
import com.vivekanand.qrticket.entity.Ticket;
import com.vivekanand.qrticket.enums.ScanLocation;
import com.vivekanand.qrticket.enums.ScanResult;
import com.vivekanand.qrticket.enums.TicketState;
import com.vivekanand.qrticket.enums.TicketType;
import com.vivekanand.qrticket.enums.TicketValidFor;
import com.vivekanand.qrticket.repository.EntryLogRepository;
import com.vivekanand.qrticket.repository.TicketRepository;
import com.vivekanand.qrticket.util.QRCodeGenerator;

@Service
@Transactional
public class TicketServiceImpl implements TicketService {

    private final TicketRepository ticketRepository;
    private final EntryLogRepository entryLogRepository;

    public TicketServiceImpl(
            TicketRepository ticketRepository,
            EntryLogRepository entryLogRepository) {
        this.ticketRepository = ticketRepository;
        this.entryLogRepository = entryLogRepository;
    }

    // =====================================================
    // TICKET GENERATION
    // =====================================================
    @Override
    public List<TicketInfo> generateTicket(TotalTicket totalTicket) {

        List<TicketInfo> tickets = new ArrayList<>();

        for (int i = 0; i < totalTicket.getAdult(); i++)
            tickets.add(createTicket(TicketType.ADULT, totalTicket.getValidFor()));

        for (int i = 0; i < totalTicket.getKid(); i++)
            tickets.add(createTicket(TicketType.KID, totalTicket.getValidFor()));

        return tickets;
    }

    private TicketInfo createTicket(TicketType type, TicketValidFor validFor) {

        String rawValue = UUID.randomUUID() + "-" + System.nanoTime();
        String qrHash = generateHash(rawValue);

        Ticket ticket = new Ticket();
        ticket.setQrHash(qrHash);
        ticket.setVisitDate(LocalDate.now());
        ticket.setType(type);
        ticket.setTicketValidFor(validFor);

        Ticket saved = ticketRepository.save(ticket);
        return ticketModelToDto(saved);
    }

    private TicketInfo ticketModelToDto(Ticket ticket) {

        TicketInfo dto = new TicketInfo();
        dto.setId(ticket.getId());
        dto.setCreatedAt(ticket.getCreatedAt());
        dto.setVisitDate(ticket.getVisitDate());
        dto.setType(ticket.getType());
        dto.setValidFor(ticket.getTicketValidFor());
        dto.setPrice(ticket.getType() == TicketType.ADULT ? 15 : 0);
        dto.setQrImage(QRCodeGenerator.generateQrPng(ticket.getQrHash()));

        return dto;
    }

    // =====================================================
    // UNIVERSAL SCANNER LOGIC
    // =====================================================
    @Override
    public ScanResult scanTicket(String qrHash, ScanLocation location) {

        Optional<Ticket> optionalTicket = ticketRepository.findByQrHash(qrHash);

        if (optionalTicket.isEmpty())
            return ScanResult.NOT_EXISTS;

        Ticket ticket = optionalTicket.get();

        // Expiry check
        if (ticket.isExpired()) {
            ticket.setState(TicketState.EXPIRED);
            ticketRepository.save(ticket);
            saveEntryLog(ticket, location, ScanResult.EXPIRED);
            return ScanResult.EXPIRED;
        }

        if (ticket.getState() != TicketState.ACTIVE) {
            saveEntryLog(ticket, location, ScanResult.ALREADY_SCANNED);
            return ScanResult.ALREADY_SCANNED;
        }

        // ---------- GATE SCAN ----------
        if (location == ScanLocation.GATE) {

            if (!ticket.canEnterGate()) {
                saveEntryLog(ticket, location, ScanResult.WRONG_LOCATION);
                return ScanResult.WRONG_LOCATION;
            }

            ticket.markGateScanned();
            ticketRepository.save(ticket);

            saveEntryLog(ticket, location, ScanResult.VALID);
            return ScanResult.VALID;
        }

        // ---------- MUSEUM SCAN ----------
        if (location == ScanLocation.MUSEUM) {

            if (ticket.getTicketValidFor() == TicketValidFor.BOTH && !ticket.isGateScanned()) {
                saveEntryLog(ticket, location, ScanResult.GATE_FIRST_REQUIRED);
                return ScanResult.GATE_FIRST_REQUIRED;
            }

            if (!ticket.canEnterMuseum()) {
                saveEntryLog(ticket, location, ScanResult.WRONG_LOCATION);
                return ScanResult.WRONG_LOCATION;
            }

            ticket.markMuseumScanned();
            ticketRepository.save(ticket);

            saveEntryLog(ticket, location, ScanResult.VALID);
            return ScanResult.VALID;
        }

        return ScanResult.WRONG_LOCATION;
    }

    // =====================================================
    // ENTRY LOG SAVER
    // =====================================================
    private void saveEntryLog(Ticket ticket, ScanLocation location, ScanResult result) {

        EntryLog log = new EntryLog();
        log.setTicket(ticket);
        log.setLocation(location);
        log.setScanResult(result);
        log.setTicketType(ticket.getType());

        entryLogRepository.save(log);
    }

    // =====================================================
    // QR HASH GENERATOR
    // =====================================================
    private String generateHash(String input) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(input.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hash);
        } catch (Exception ex) {
            throw new IllegalStateException("Failed to generate QR hash", ex);
        }
    }
}
