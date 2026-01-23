package com.vivekanand.qrticket.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
import com.vivekanand.qrticket.enums.TicketStatus;
import com.vivekanand.qrticket.enums.TicketType;
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

    /**
     * Generate a new ticket for today
     */
    @Override
    public List<TicketInfo> generateTicket(TotalTicket totalTicket) {

    	List<TicketInfo> tickets = new ArrayList<>();
        
    	for(int i=0;i<totalTicket.getAdult();i++) {
    		String rawValue = UUID.randomUUID().toString() + System.nanoTime();
            String qrHash = generateHash(rawValue);

            Ticket ticket = new Ticket();
            ticket.setQrHash(qrHash);
            ticket.setVisitDate(LocalDateTime.now());
            ticket.setType(TicketType.ADULT);
            tickets.add(ticketModelToDto(ticketRepository.save(ticket)));
            
    	}
    	
    	for(int i=0;i<totalTicket.getKid();i++) {
    		String rawValue = UUID.randomUUID().toString() + System.nanoTime();
            String qrHash = generateHash(rawValue);

            Ticket ticket = new Ticket();
            ticket.setQrHash(qrHash);
            ticket.setVisitDate(LocalDateTime.now());
            ticket.setType(TicketType.KID);
            tickets.add(ticketModelToDto(ticketRepository.save(ticket)));
            
    	}
    	
        return tickets;
    }

    private TicketInfo ticketModelToDto(Ticket ticket) {
		// TODO Auto-generated method stub
    	TicketInfo ticketInfo = new TicketInfo();
    	ticketInfo.setCreatedAt(ticket.getCreatedAt());
        ticketInfo.setVisitDate(ticket.getVisitDate());
        ticketInfo.setId(ticket.getId());
        ticketInfo.setType(ticket.getType());
        ticketInfo.setPrice((ticket.getType() == TicketType.ADULT)?15:0) ;
        
        ticketInfo.setQrImage(QRCodeGenerator.generateQrPng(ticket.getQrHash()));
        
        return ticketInfo;
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
        
        log.setType(ticket.getType());
        boolean alreadyScanned =
                entryLogRepository.existsByTicket(ticket);

        if (alreadyScanned) {
            log.setScanResult(TicketStatus.PREVIOUSLY_USED);
            entryLogRepository.save(log);
            return TicketStatus.PREVIOUSLY_USED;
        }

        // mark ticket as used
        ticket.setUsed(true);
        if (LocalDate.now().isAfter(ticket.getVisitDate().toLocalDate())) {
            log.setScanResult(TicketStatus.EXPIRED);
            entryLogRepository.save(log);
            return TicketStatus.EXPIRED;
        }

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
