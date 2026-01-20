package com.vivekanand.qrticket.controller;

import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vivekanand.qrticket.dto.TicketValidationRequestDto;
import com.vivekanand.qrticket.dto.TicketValidationResponseDto;
import com.vivekanand.qrticket.entity.Ticket;
import com.vivekanand.qrticket.enums.TicketStatus;
import com.vivekanand.qrticket.repository.TicketRepository;
import com.vivekanand.qrticket.service.TicketService;
import com.vivekanand.qrticket.util.QRCodeGenerator;

@RestController
@RequestMapping("/api/ticket")
public class TicketController {

    private final TicketService ticketService;
    private final TicketRepository ticketRepository;

    public TicketController(
            TicketService ticketService,
            TicketRepository ticketRepository) {
        this.ticketService = ticketService;
        this.ticketRepository = ticketRepository;
    }

    /**
     * Generate a new ticket
     * POST /api/tickets
     */
    @PostMapping("/generate")
    public ResponseEntity<Ticket> generateTicket() {

        Ticket ticket = ticketService.generateTicket();
        return new ResponseEntity<>(ticket, HttpStatus.CREATED);
    }

    /**
     * Get QR code for a ticket
     * GET /api/tickets/{id}/qr
     */
    @GetMapping("get/{id}")
    public ResponseEntity<byte[]> getTicketQr(@PathVariable UUID id) {

        Optional<Ticket> optionalTicket = ticketRepository.findById(id);

        if (optionalTicket.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Ticket ticket = optionalTicket.get();

        byte[] qrImage = QRCodeGenerator.generateQrPng(ticket.getQrHash());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);
        headers.setContentLength(qrImage.length);

        return new ResponseEntity<>(qrImage, headers, HttpStatus.OK);
    }
    
    @PostMapping("validate")
    public ResponseEntity<TicketValidationResponseDto> validateTicket(
            @RequestBody TicketValidationRequestDto request) {

        TicketStatus status = ticketService.validateTicket(
                request.getQrHash()
        );

        switch (status) {

            case VALID:
                return ResponseEntity.ok(
                        new TicketValidationResponseDto("VALID", "Entry allowed")
                );

            case PREVIOUSLY_USED:
            	System.out.println("request aae h");
                return ResponseEntity.ok(new TicketValidationResponseDto(
                                "PREVIOUSLY_USED",
                                "Ticket already used"
                        ));

            case NOT_EXISTS:
            default:
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new TicketValidationResponseDto(
                                "NOT_FOUND",
                                "Invalid or expired ticket"
                        ));
        }
    }
}
