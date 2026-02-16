package com.vivekanand.qrticket.dto;

import com.vivekanand.qrticket.enums.ScanLocation;

public class TicketValidationRequestDto {

    private String qrHash;
    private ScanLocation location;

    public String getQrHash() {
        return qrHash;
    }

    public void setQrHash(String qrHash) {
        this.qrHash = qrHash;
    }

    public ScanLocation getLocation() {
        return location;
    }

    public void setLocation(ScanLocation location) {
        this.location = location;
    }
}
