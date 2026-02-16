package com.vivekanand.qrticket.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

import com.vivekanand.qrticket.enums.TicketState;
import com.vivekanand.qrticket.enums.TicketType;
import com.vivekanand.qrticket.enums.TicketValidFor;

import jakarta.persistence.*;

@Entity
@Table(name = "tickets",
       indexes = {
           @Index(name = "idx_ticket_qr_hash", columnList = "qr_hash", unique = true),
           @Index(name = "idx_ticket_visit_date", columnList = "visit_date")
       })
public class Ticket {

    @Id
    @GeneratedValue
    @Column(nullable = false, updatable = false)
    private UUID id;

    @Column(name = "qr_hash", nullable = false, unique = true, length = 128)
    private String qrHash;

    @Column(name = "visit_date", nullable = false)
    private LocalDate visitDate;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // Ticket category (Adult/Child/VIP etc - your existing enum)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TicketType type;

    // Where ticket is valid
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TicketValidFor ticketValidFor;

    // Lifecycle state of ticket
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TicketState state = TicketState.ACTIVE;

    // -------- Gate Scan --------
    @Column(name = "gate_scanned", nullable = false)
    private boolean gateScanned = false;

    @Column(name = "gate_scan_time")
    private LocalDateTime gateScanTime;

    // -------- Museum Scan --------
    @Column(name = "museum_scanned", nullable = false)
    private boolean museumScanned = false;

    @Column(name = "museum_scan_time")
    private LocalDateTime museumScanTime;

    // Constructor
    public Ticket() {
        this.createdAt = LocalDateTime.now();
    }

    // ===== Business Logic Methods =====

    public boolean isExpired() {
        return visitDate.isBefore(LocalDate.now());
    }

    public boolean canEnterGate() {
        if (state != TicketState.ACTIVE) return false;
        if (ticketValidFor == TicketValidFor.MUSEUM) return false;
        return !gateScanned;
    }

    public boolean canEnterMuseum() {
        if (state != TicketState.ACTIVE) return false;
        if (ticketValidFor == TicketValidFor.GATE) return false;

        // Combo ticket must visit gate first
        if (ticketValidFor == TicketValidFor.BOTH && !gateScanned) return false;

        return !museumScanned;
    }

    public void markGateScanned() {
        this.gateScanned = true;
        this.gateScanTime = LocalDateTime.now();
    }

    public void markMuseumScanned() {
        this.museumScanned = true;
        this.museumScanTime = LocalDateTime.now();

        // Ticket completion rules
        if (ticketValidFor == TicketValidFor.MUSEUM) {
            this.state = TicketState.COMPLETED;
        }

        if (ticketValidFor == TicketValidFor.BOTH && gateScanned) {
            this.state = TicketState.COMPLETED;
        }
    }

	public UUID getId() {
		return id;
	}

	public String getQrHash() {
		return qrHash;
	}

	public LocalDate getVisitDate() {
		return visitDate;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public TicketType getType() {
		return type;
	}

	public TicketValidFor getTicketValidFor() {
		return ticketValidFor;
	}

	public TicketState getState() {
		return state;
	}

	public boolean isGateScanned() {
		return gateScanned;
	}

	public LocalDateTime getGateScanTime() {
		return gateScanTime;
	}

	public boolean isMuseumScanned() {
		return museumScanned;
	}

	public LocalDateTime getMuseumScanTime() {
		return museumScanTime;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public void setQrHash(String qrHash) {
		this.qrHash = qrHash;
	}

	public void setVisitDate(LocalDate visitDate) {
		this.visitDate = visitDate;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public void setType(TicketType type) {
		this.type = type;
	}

	public void setTicketValidFor(TicketValidFor ticketValidFor) {
		this.ticketValidFor = ticketValidFor;
	}

	public void setState(TicketState state) {
		this.state = state;
	}

	public void setGateScanned(boolean gateScanned) {
		this.gateScanned = gateScanned;
	}

	public void setGateScanTime(LocalDateTime gateScanTime) {
		this.gateScanTime = gateScanTime;
	}

	public void setMuseumScanned(boolean museumScanned) {
		this.museumScanned = museumScanned;
	}

	public void setMuseumScanTime(LocalDateTime museumScanTime) {
		this.museumScanTime = museumScanTime;
	}
    
    

    }
