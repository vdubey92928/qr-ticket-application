package com.vivekanand.qrticket.entity;


import java.time.LocalDateTime;
import java.util.UUID;

import com.vivekanand.qrticket.enums.TicketStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "entry_logs", indexes = { @Index(name = "idx_entrylog_ticket_id", columnList = "ticket_id"),
		@Index(name = "idx_entrylog_scanned_at", columnList = "scanned_at") })
public class EntryLog {

	@Id
	@GeneratedValue
	@Column(name = "id", nullable = false, updatable = false)
	private UUID id;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "ticket_id", nullable = false)
	private Ticket ticket;

	@Column(name = "scan_result", nullable = false, length = 20)
	private TicketStatus scanResult; // VALID, PREVIOUSLY_USED, NOT_EXISTS

	@Column(name = "scanned_at", nullable = false)
	private LocalDateTime scannedAt;

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
