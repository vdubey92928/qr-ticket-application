package com.vivekanand.qrticket.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

import com.vivekanand.qrticket.enums.TicketType;
import com.vivekanand.qrticket.enums.TicketValidFor;

public class TicketInfo {

    private UUID id;
    private LocalDate visitDate;
    private LocalDateTime createdAt;
    private int price;
    private TicketType type;
    private TicketValidFor validFor;
    private byte[] qrImage;

    // ===== Getters =====
    public UUID getId() { return id; }
    public LocalDate getVisitDate() { return visitDate; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public int getPrice() { return price; }
    public TicketType getType() { return type; }
    public TicketValidFor getValidFor() { return validFor; }
    public byte[] getQrImage() { return qrImage; }

    // ===== Setters =====
    public void setId(UUID id) { this.id = id; }
    public void setVisitDate(LocalDate visitDate) { this.visitDate = visitDate; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public void setPrice(int price) { this.price = price; }
    public void setType(TicketType type) { this.type = type; }
    public void setValidFor(TicketValidFor validFor) { this.validFor = validFor; }
    public void setQrImage(byte[] qrImage) { this.qrImage = qrImage; }
	
}
