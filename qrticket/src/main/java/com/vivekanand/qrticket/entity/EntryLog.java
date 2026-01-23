package com.vivekanand.qrticket.entity;


import java.time.LocalDateTime;
import java.util.UUID;

import com.vivekanand.qrticket.enums.TicketStatus;
import com.vivekanand.qrticket.enums.TicketType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "entry_logs")
public class EntryLog {

	@Id
	@GeneratedValue
	@Column(name = "id", nullable = false, updatable = false)
	private UUID id;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "ticket_id", nullable = false)
	private Ticket ticket;

	@Column(name = "scan_result", nullable = false, length = 20)
	@Enumerated(EnumType.STRING)
	private TicketStatus scanResult;

	@Column(name = "scanned_at", nullable = false)
	private LocalDateTime scannedAt;
	
	@Column( nullable = false, length = 20)
	@Enumerated(EnumType.STRING)
	private TicketType type;

	public TicketType getType() {
		return type;
	}

	public void setType(TicketType type) {
		this.type = type;
	}

	@PrePersist
	protected void onScan() {
		this.scannedAt = LocalDateTime.now();
	}

	public UUID getId() {
		return id;
	}


	public Ticket getTicket() {
		return ticket;
	}

	public TicketStatus getScanResult() {
		return scanResult;
	}


	public LocalDateTime getScannedAt() {
		return scannedAt;
	}

	public EntryLog() {
		
	}

	public void setTicket(Ticket ticket) {
		this.ticket = ticket;
	}

	public void setScanResult(TicketStatus previouslyUsed) {
		this.scanResult = previouslyUsed;
	}
	
	
}
