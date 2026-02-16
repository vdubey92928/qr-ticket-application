package com.vivekanand.qrticket.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vivekanand.qrticket.entity.Ticket;
import com.vivekanand.qrticket.enums.TicketState;
import com.vivekanand.qrticket.enums.TicketValidFor;

public interface TicketRepository extends JpaRepository<Ticket, UUID> {

    // Find ticket from QR scan
    Optional<Ticket> findByQrHash(String qrHash);

    // Tickets for a specific visit date (daily report)
    List<Ticket> findByVisitDate(LocalDate visitDate);

    // Tickets by lifecycle state (ACTIVE / COMPLETED / EXPIRED)
    List<Ticket> findByState(TicketState state);

    // Tickets by validity type (Gate/Museum/Both analytics)
    List<Ticket> findByTicketValidFor(TicketValidFor ticketValidFor);
}
