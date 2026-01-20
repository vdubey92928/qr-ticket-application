package com.vivekanand.qrticket.dto;


import java.time.LocalDateTime;

public class TicketValidationRequestDto {

    private String qrHash;
    private LocalDateTime visitDate;

    public String getQrHash() {
        return qrHash;
    }

    public void setQrHash(String qrHash) {
        this.qrHash = qrHash;
    }

    public LocalDateTime getVisitDate() {
        return visitDate;
    }

    public void setVisitDate(LocalDateTime visitDate) {
        this.visitDate = visitDate;
    }
}
