package com.vivekanand.qrticket.controller;

import com.razorpay.RazorpayException;
import com.vivekanand.qrticket.service.PaymentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-order")
    public String createOrder(@RequestParam int amount){

        try {
        	String b = paymentService.createOrder(amount, "INR", "recepient_100");
        	System.out.println("\n\n "+b+"\n\n");
            return b;
        } catch (RazorpayException e) {
            throw new RuntimeException(e);
        }
    }
    
}
