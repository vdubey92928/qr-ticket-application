package com.vivekanand.qrticket.entity;


import java.time.LocalDateTime;
import java.util.UUID;

import com.vivekanand.qrticket.enums.TicketType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;

@Entity
@Table(name = "tickets", indexes = { @Index(name = "idx_ticket_qr_hash", columnList = "qr_hash", unique = true),
		@Index(name = "idx_ticket_visit_date", columnList = "visit_date") })

public class Ticket {

	@Id
	@GeneratedValue
	@Column(name = "id", nullable = false, updatable = false)
	private UUID id;

	@Column(name = "qr_hash", nullable = false, unique = true, length = 128)
	private String qrHash;

	@Column(name = "visit_date", nullable = false)
	private LocalDateTime visitDate;

	@Column(name = "used", nullable = false)
	private boolean used;

	@Column(name = "created_at", nullable = false, updatable = false)
	private LocalDateTime createdAt;

	@Column(name = "used_at")
	private LocalDateTime usedAt;
	
	@Column(nullable = false, length = 20)
	@Enumerated(EnumType.STRING)
	private TicketType type;
	
	

	public TicketType getType() {
		return type;
	}

	public void setType(TicketType type) {
		this.type = type;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public UUID getId() {
		return id;
	}

	public String getQrHash() {
		return qrHash;
	}


	public LocalDateTime getVisitDate() {
		return visitDate;
	}

	public void setVisitDate(LocalDateTime visitDate) {
		this.visitDate = visitDate;
	}

	public boolean isUsed() {
		return used;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public LocalDateTime getUsedAt() {
		return usedAt;
	}


	public Ticket() {
		this.createdAt = LocalDateTime.now();
		this.used = false;
	}

	public void setQrHash(String qrHash) {
		this.qrHash = qrHash;
		
	}

	public void setUsed(boolean b) {
		this.used = b;
		
	}

	public void setUsedAt(LocalDateTime now) {
		this.usedAt = now;
		
	}

}
