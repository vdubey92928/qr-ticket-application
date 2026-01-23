package com.vivekanand.qrticket.controller;

import java.util.List;
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

import com.vivekanand.qrticket.dto.TicketInfo;
import com.vivekanand.qrticket.dto.TicketValidationRequestDto;
import com.vivekanand.qrticket.dto.TicketValidationResponseDto;
import com.vivekanand.qrticket.dto.TotalTicket;
import com.vivekanand.qrticket.entity.Ticket;
import com.vivekanand.qrticket.enums.TicketStatus;
import com.vivekanand.qrticket.enums.TicketType;
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
    public ResponseEntity<List<TicketInfo>> generateTickets(@RequestBody TotalTicket totalTicket) {

    	List<TicketInfo> tickets = ticketService.generateTicket(totalTicket);
        return new ResponseEntity<>(tickets, HttpStatus.CREATED);
    }

    /**
     * Get QR code for a ticket
     * GET /api/tickets/{id}/qr
     */
    @GetMapping("getDetail/{id}")
    public ResponseEntity<TicketInfo> getQrImg(@PathVariable UUID id){
    	
    	Optional<Ticket> optionalTicket = ticketRepository.findById(id);

        if (optionalTicket.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        
        Ticket ticket = optionalTicket.get();
        
        TicketInfo ticketInfo = new TicketInfo(); 
        ticketInfo.setCreatedAt(ticket.getCreatedAt());
        ticketInfo.setVisitDate(ticket.getVisitDate());
        ticketInfo.setId(ticket.getId());
        ticketInfo.setType(ticket.getType());
        ticketInfo.setPrice((ticket.getType() == TicketType.ADULT)?15:0) ;
        
        ticketInfo.setQrImage(QRCodeGenerator.generateQrPng(ticket.getQrHash()));
    	
    	return ResponseEntity.ok(ticketInfo);
    }
    
    @GetMapping("get/{id}")
    public ResponseEntity<byte[]> getTicketQr(@PathVariable UUID id) {
        Optional<Ticket> optionalTicket = ticketRepository.findById(id);

        if (optionalTicket.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        
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
                
            case EXPIRED:
                return ResponseEntity.ok(
                        new TicketValidationResponseDto("EXPIRED", "Entry Not allowed")
                );


            case PREVIOUSLY_USED:
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
