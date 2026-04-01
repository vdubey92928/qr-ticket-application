package com.vivekanand.qrticket.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vivekanand.qrticket.dto.TicketInfo;
import com.vivekanand.qrticket.dto.TicketValidationRequestDto;
import com.vivekanand.qrticket.dto.TicketValidationResponseDto;
import com.vivekanand.qrticket.dto.TotalTicket;
import com.vivekanand.qrticket.entity.Payment;
import com.vivekanand.qrticket.entity.Ticket;
import com.vivekanand.qrticket.enums.ScanResult;
import com.vivekanand.qrticket.enums.TicketType;
import com.vivekanand.qrticket.repository.PaymentRepository;
import com.vivekanand.qrticket.repository.TicketRepository;
import com.vivekanand.qrticket.service.TicketService;
import com.vivekanand.qrticket.util.QRCodeGenerator;

@RestController
@RequestMapping("/api/ticket")
public class TicketController {

	private final TicketService ticketService;
    private final TicketRepository ticketRepository;
    private final PaymentRepository paymentRepository;

    public TicketController(
            TicketService ticketService,
            TicketRepository ticketRepository,
            PaymentRepository paymentRepository) {
        this.ticketService = ticketService;
        this.ticketRepository = ticketRepository;
        this.paymentRepository=paymentRepository;
    }

    // ======================================================
    // GENERATE TICKETS
    // ======================================================
    @PostMapping("/generate")
    public ResponseEntity<?> generateTicket(
            @RequestBody TotalTicket ticket,
            @RequestParam String paymentId) {

        // 🔥 check payment exists
        Payment payment = paymentRepository.findByPaymentId(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        if (!payment.getStatus().equals("SUCCESS")) {
            throw new RuntimeException("Payment not completed");
        }

        try {
            return new ResponseEntity<>(ticketService.generateTicket(ticket), HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();  // 🔥 MUST
            throw e;
        }
        
    }
   

    // ======================================================
    // GET TICKET DETAILS WITH QR IMAGE
    // ======================================================
    @GetMapping("/detail/{id}")
    public ResponseEntity<TicketInfo> getTicketDetail(@PathVariable UUID id) {

        Optional<Ticket> optionalTicket = ticketRepository.findById(id);
        if (optionalTicket.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        Ticket ticket = optionalTicket.get();

        TicketInfo info = new TicketInfo();
        info.setId(ticket.getId());
        info.setCreatedAt(ticket.getCreatedAt());
        info.setVisitDate(ticket.getVisitDate());
        info.setType(ticket.getType());
        info.setValidFor(ticket.getTicketValidFor());
        info.setPrice(ticket.getType() == TicketType.ADULT ? 15 : 0);
        info.setQrImage(QRCodeGenerator.generateQrPng(ticket.getQrHash()));

        return ResponseEntity.ok(info);
    }

    // ======================================================
    // GET ONLY QR IMAGE
    // ======================================================
    @GetMapping("/qr/{id}")
    public ResponseEntity<byte[]> getTicketQr(@PathVariable UUID id) {

        Optional<Ticket> optionalTicket = ticketRepository.findById(id);
        if (optionalTicket.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        byte[] qrImage = QRCodeGenerator.generateQrPng(optionalTicket.get().getQrHash());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);
        headers.setContentLength(qrImage.length);

        return new ResponseEntity<>(qrImage, headers, HttpStatus.OK);
    }

    // ======================================================
    // UNIVERSAL SCANNER API (GATE + MUSEUM)
    // ======================================================
    @PostMapping("/scan")
    public ResponseEntity<TicketValidationResponseDto> scanTicket(
            @RequestBody TicketValidationRequestDto request) {

        ScanResult result = ticketService.scanTicket(
                request.getQrHash(),
                request.getLocation()
        );

        return ResponseEntity.ok(buildResponse(result));
    }

    // ======================================================
    // RESPONSE BUILDER FOR SCANNER UI
    // ======================================================
    private TicketValidationResponseDto buildResponse(ScanResult result) {

        switch (result) {

            case VALID:
                return new TicketValidationResponseDto(result, "Entry Allowed", true);
 
            case EXPIRED:
                return new TicketValidationResponseDto(result, "Ticket Expired", false);

            case ALREADY_SCANNED:
                return new TicketValidationResponseDto(result, "Ticket Already Used", false);

            case GATE_FIRST_REQUIRED:
                return new TicketValidationResponseDto(result, "Visit Gate First", false);

            case WRONG_LOCATION:
                return new TicketValidationResponseDto(result, "Invalid Ticket For This Location", false);

            case NOT_FOR_TODAY:
            	return new TicketValidationResponseDto(result, "Ticket is booked for future date", false);
            	
            case NOT_EXISTS:
            default:
                return new TicketValidationResponseDto(result, "Invalid Ticket", false);
        }
    }
}
