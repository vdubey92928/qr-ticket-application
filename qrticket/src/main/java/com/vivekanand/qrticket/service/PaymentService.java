package com.vivekanand.qrticket.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.vivekanand.qrticket.dto.TotalTicket;
import com.vivekanand.qrticket.enums.TicketValidFor;

import java.util.Base64;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

     @Value("${razorpay.api.key}")
    private String apiKey ;

    @Value("${razorpay.api.secret}")
    private String apiSecret ;

    public Order createOrder(int amount, String currency) throws RazorpayException {

        RazorpayClient client = new RazorpayClient(apiKey, apiSecret);

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount * 100);
        orderRequest.put("currency", currency);
        orderRequest.put("receipt", "txn_" + System.currentTimeMillis());

        return client.orders.create(orderRequest);
    }
    
    public boolean verifyPayment(String orderId, String paymentId, String signature) {

        try {
            String data = orderId + "|" + paymentId;

            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(apiSecret.getBytes(), "HmacSHA256");
            mac.init(secretKey);

            byte[] rawHmac = mac.doFinal(data.getBytes());

            // 🔥 FIX: Convert to HEX (NOT Base64)
            StringBuilder hex = new StringBuilder(2 * rawHmac.length);
            for (byte b : rawHmac) {
                String s = Integer.toHexString(0xff & b);
                if (s.length() == 1) hex.append('0');
                hex.append(s);
            }

            String generatedSignature = hex.toString();

            System.out.println("Generated: " + generatedSignature);
            System.out.println("Received : " + signature);

            return generatedSignature.equals(signature);

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    
    public int calculateAmount(TotalTicket ticket) {

        int total = 0;
        System.out.println(ticket.getValidFor());

        if (ticket.getValidFor() == TicketValidFor.MUSEUM) {
        	 total += ticket.getAdult() * 10;
             total += ticket.getKid() * 5;
        }
        
        if (ticket.getValidFor() == TicketValidFor.GATE) {
       	 total += ticket.getAdult() * 15;
            total += ticket.getKid() * 5;
       }
       
        if (ticket.getValidFor() == TicketValidFor.BOTH) {
       	 total += ticket.getAdult() * 25;
            total += ticket.getKid() * 10;
       }

        return total;
    }

}
