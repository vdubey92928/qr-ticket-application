package com.vivekanand.qrticket.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.vivekanand.qrticket.entity.EntryLog;
import com.vivekanand.qrticket.entity.Ticket;
import com.vivekanand.qrticket.repository.EntryLogRepository;
import com.vivekanand.qrticket.repository.TicketRepository;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
	@Autowired
    private TicketRepository ticketRepository;
	
	@Autowired
    private EntryLogRepository entryLogRepository;
//    public AdminController(
//            TicketRepository ticketRepository,
//            EntryLogRepository entryLogRepository) {
//        this.ticketRepository = ticketRepository;
//        this.entryLogRepository = entryLogRepository;
//    }

    /**
     * Get all tickets
     * Optional filter: used=true/false
     */
    @GetMapping("/tickets")
    public List<Ticket> getAllTickets(
            @RequestParam(required = false) Boolean used) {

        if (used == null) {
            return ticketRepository.findAll();
        }

        return ticketRepository.findByUsed(used);
    }

    /**
     * Get all entry logs
     */
    @GetMapping("/entry-logs")
    public List<EntryLog> getAllEntryLogs() {
        return entryLogRepository.findAll();
    }

  
    @GetMapping("/entry-logs/{ticketId}")
    public List<EntryLog> getLogsByTicket(@PathVariable UUID ticketId) {

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() ->
                        new IllegalArgumentException("Ticket not found"));

        return entryLogRepository.findAllByTicket(ticket);
    }
}
