package com.vivekanand.qrticket.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vivekanand.qrticket.entity.EntryLog;
import com.vivekanand.qrticket.entity.Ticket;
import com.vivekanand.qrticket.enums.ScanLocation;
import com.vivekanand.qrticket.enums.ScanResult;

public interface EntryLogRepository extends JpaRepository<EntryLog, UUID> {

    // All scans of a ticket
    List<EntryLog> findAllByTicket(Ticket ticket);

    // Logs by location (Gate/Museum analytics)
    List<EntryLog> findByLocation(ScanLocation location);

    // Logs by result (VALID / EXPIRED etc)
    List<EntryLog> findByScanResult(ScanResult result);

    // Logs between time range (daily reports)
    List<EntryLog> findByScannedAtBetween(LocalDateTime start, LocalDateTime end);
}
