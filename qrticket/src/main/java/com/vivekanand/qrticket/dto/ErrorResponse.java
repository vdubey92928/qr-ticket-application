package com.vivekanand.qrticket.dto;


import java.time.LocalDateTime;

public class ErrorResponse {

    private boolean success;
    private String message;
    private LocalDateTime timestamp;

    public ErrorResponse(boolean success, String message, LocalDateTime timestamp) {
        this.success = success;
        this.message = message;
        this.timestamp = timestamp;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }
}