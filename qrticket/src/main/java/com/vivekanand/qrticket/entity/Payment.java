package com.vivekanand.qrticket.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String orderId;
    private String paymentId;
    private String status; // SUCCESS / FAILED

    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

	public Long getId() {
		return id;
	}

	public String getOrderId() {
		return orderId;
	}

	public String getPaymentId() {
		return paymentId;
	}

	public String getStatus() {
		return status;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public void setPaymentId(String paymentId) {
		this.paymentId = paymentId;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

    
}