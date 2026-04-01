package com.vivekanand.qrticket.controller;

import com.razorpay.Order;
import com.razorpay.RazorpayException;
import com.vivekanand.qrticket.dto.TotalTicket;
import com.vivekanand.qrticket.entity.Payment;
import com.vivekanand.qrticket.repository.PaymentRepository;
import com.vivekanand.qrticket.service.PaymentService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;
    
    @Autowired
    private PaymentRepository paymentRepository;

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody TotalTicket ticket) {

        int amount = paymentService.calculateAmount(ticket);

        if (amount <= 0) {
            throw new RuntimeException("Invalid ticket request");
        }

        try {
            Order order = paymentService.createOrder(amount, "INR");

            Map<String, Object> response = new HashMap<>();
            response.put("id", order.get("id"));
            response.put("amount", order.get("amount"));

            return ResponseEntity.ok(response);

        } catch (RazorpayException e) {
            throw new RuntimeException("Payment initiation failed");
        }
    }
    
    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, String> data) {

        boolean isValid = paymentService.verifyPayment(
                data.get("orderId"),
                data.get("paymentId"),
                data.get("signature")
        );

        if (!isValid) {
            throw new RuntimeException("Invalid payment");
        }

        // 🔥 Save payment
        Payment payment = new Payment();
        payment.setOrderId(data.get("orderId"));
        payment.setPaymentId(data.get("paymentId"));
        payment.setStatus("SUCCESS");

        paymentRepository.save(payment);

        return ResponseEntity.ok("Payment verified");
    }
    
}
