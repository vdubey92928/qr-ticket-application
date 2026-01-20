package com.vivekanand.qrticket.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.LocalDateTime;
import java.util.HexFormat;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vivekanand.qrticket.entity.EntryLog;
import com.vivekanand.qrticket.entity.Ticket;
import com.vivekanand.qrticket.enums.TicketStatus;
import com.vivekanand.qrticket.repository.EntryLogRepository;
import com.vivekanand.qrticket.repository.TicketRepository;

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

    /**
     * Generate a new ticket for today
     */
    @Override
    public Ticket generateTicket() {

        String rawValue = UUID.randomUUID().toString() + System.nanoTime();
        String qrHash = generateHash(rawValue);

        Ticket ticket = new Ticket();
        ticket.setQrHash(qrHash);
        ticket.setVisitDate(LocalDateTime.now());

        return ticketRepository.save(ticket);
    }

    /**
     * Validate ticket at gate
     */
    @Override
    public TicketStatus validateTicket(String qrHash) {

        Optional<Ticket> optionalTicket =
                ticketRepository.findByQrHash(qrHash);

        if (optionalTicket.isEmpty()) {
            return TicketStatus.NOT_EXISTS;
        }

        Ticket ticket = optionalTicket.get();
        EntryLog log = new EntryLog();
        log.setTicket(ticket);

        boolean alreadyScanned =
                entryLogRepository.existsByTicket(ticket);

        if (alreadyScanned) {
            log.setScanResult(TicketStatus.PREVIOUSLY_USED);
            entryLogRepository.save(log);
            return TicketStatus.PREVIOUSLY_USED;
        }

        // mark ticket as used
        ticket.setUsed(true);
        ticket.setUsedAt(LocalDateTime.now());
        ticketRepository.save(ticket);

        // log entry
        
        log.setScanResult(TicketStatus.VALID);
        entryLogRepository.save(log);

        return TicketStatus.VALID;
    }

    /**
     * Internal hash generator for QR
     */
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
