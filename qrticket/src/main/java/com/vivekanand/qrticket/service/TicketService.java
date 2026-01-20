package com.vivekanand.qrticket.service;



import com.vivekanand.qrticket.entity.Ticket;
import com.vivekanand.qrticket.enums.TicketStatus;

public interface TicketService {
	
	
	Ticket generateTicket();
	
	TicketStatus validateTicket(String qrHash);

	

}
