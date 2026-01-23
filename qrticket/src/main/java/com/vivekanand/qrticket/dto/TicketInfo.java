package com.vivekanand.qrticket.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.vivekanand.qrticket.enums.TicketType;

public class TicketInfo {
	
	private UUID id;
	private LocalDateTime visitDate;
	private LocalDateTime createdAt;
	private int price;
	private TicketType type;
	private byte[] qrImage;
	
	public UUID getId() {
		return id;
	}
	public LocalDateTime getVisitDate() {
		return visitDate;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public int getPrice() {
		return price;
	}
	public TicketType getType() {
		return type;
	}
	public void setId(UUID id) {
		this.id = id;
	}
	public void setVisitDate(LocalDateTime visitDate) {
		this.visitDate = visitDate;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public void setType(TicketType type) {
		this.type = type;
	}
	public byte[] getQrImage() {
		return qrImage;
	}
	public void setQrImage(byte[] qrImage) {
		this.qrImage = qrImage;
	}
	
	
	
	
	
	
}
