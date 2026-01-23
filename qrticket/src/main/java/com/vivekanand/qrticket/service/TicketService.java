package com.vivekanand.qrticket.service;



import java.util.List;

import com.vivekanand.qrticket.dto.TicketInfo;
import com.vivekanand.qrticket.dto.TotalTicket;
import com.vivekanand.qrticket.enums.TicketStatus;

public interface TicketService {
	
	
	List<TicketInfo> generateTicket(TotalTicket totalTicket);
	
	TicketStatus validateTicket(String qrHash);

	

}
