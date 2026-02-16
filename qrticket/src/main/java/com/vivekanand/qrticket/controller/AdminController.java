package com.vivekanand.qrticket.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.*;

import com.vivekanand.qrticket.entity.EntryLog;
import com.vivekanand.qrticket.entity.Ticket;
import com.vivekanand.qrticket.enums.TicketState;
import com.vivekanand.qrticket.repository.EntryLogRepository;
import com.vivekanand.qrticket.repository.TicketRepository;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final TicketRepository ticketRepository;
    private final EntryLogRepository entryLogRepository;

    public AdminController(
            TicketRepository ticketRepository,
            EntryLogRepository entryLogRepository) {
        this.ticketRepository = ticketRepository;
        this.entryLogRepository = entryLogRepository;
    }

    // =====================================================
    // GET ALL TICKETS
    // =====================================================
    @GetMapping("/tickets")
    public List<Ticket> getAllTickets(
            @RequestParam(required = false) TicketState state) {

        if (state == null)
            return ticketRepository.findAll();

        return ticketRepository.findByState(state);
    }

    // =====================================================
    // GET TODAY TICKETS
    // =====================================================
    @GetMapping("/tickets/today")
    public List<Ticket> getTodayTickets() {
        return ticketRepository.findByVisitDate(LocalDate.now());
    }

    // =====================================================
    // GET ALL ENTRY LOGS
    // =====================================================
    @GetMapping("/entry-logs")
    public List<EntryLog> getAllEntryLogs() {
        return entryLogRepository.findAll();
    }

    // =====================================================
    // GET LOGS BY TICKET
    // =====================================================
    @GetMapping("/entry-logs/{ticketId}")
    public List<EntryLog> getLogsByTicket(@PathVariable UUID ticketId) {

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        return entryLogRepository.findAllByTicket(ticket);
    }
}
