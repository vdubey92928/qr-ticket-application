package com.vivekanand.qrticket.dto;

import com.vivekanand.qrticket.enums.ScanResult;

public class TicketValidationResponseDto {

    private ScanResult result;
    private String message;
    private boolean success;

    public TicketValidationResponseDto(ScanResult result, String message, boolean success) {
        this.result = result;
        this.message = message;
        this.success = success;
    }

    // Getters
    public ScanResult getResult() { return result; }
    public String getMessage() { return message; }
    public boolean isSuccess() { return success; }
}
