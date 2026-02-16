package com.vivekanand.qrticket.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import com.vivekanand.qrticket.enums.ScanLocation;
import com.vivekanand.qrticket.enums.ScanResult;
import com.vivekanand.qrticket.enums.TicketType;

import jakarta.persistence.*;

@Entity
@Table(name = "entry_logs")
public class EntryLog {

    @Id
    @GeneratedValue
    @Column(nullable = false, updatable = false)
    private UUID id;

    // Which ticket was scanned
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ticket_id", nullable = false)
    private Ticket ticket;

    // Where scanning happened (GATE / MUSEUM)
    @Enumerated(EnumType.STRING)
    @Column(name = "location", nullable = false)
    private ScanLocation location;

    // Result of scan
    @Enumerated(EnumType.STRING)
    @Column(name = "scan_result", nullable = false)
    private ScanResult scanResult;

    // Ticket type snapshot for reporting
    @Enumerated(EnumType.STRING)
    @Column(name = "ticket_type", nullable = false)
    private TicketType ticketType;

    @Column(name = "scanned_at", nullable = false)
    private LocalDateTime scannedAt;

    public EntryLog() {}

    @PrePersist
    public void onCreate() {
        this.scannedAt = LocalDateTime.now();
    }

    // ===== Getters & Setters =====

    public UUID getId() {
    	return id;
    }

    public Ticket getTicket() {
    	return ticket;
    }
    public void setTicket(Ticket ticket) {
    	this.ticket = ticket; 
    }

    public ScanLocation getLocation() {
    	return location;
    }
    public void setLocation(ScanLocation location) { 
    	this.location = location;
    }

    public ScanResult getScanResult() { 
    	return scanResult; 
    }
    public void setScanResult(ScanResult scanResult) {
    	this.scanResult = scanResult; 
    }

    public TicketType getTicketType() {
    	return ticketType;
    }
    public void setTicketType(TicketType ticketType) {
    	this.ticketType = ticketType;
    }

    public LocalDateTime getScannedAt() { 
    	return scannedAt; 
    }
}
