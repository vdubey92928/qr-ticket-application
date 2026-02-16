package com.vivekanand.qrticket.service;

import java.util.List;

import com.vivekanand.qrticket.dto.TicketInfo;
import com.vivekanand.qrticket.dto.TotalTicket;
import com.vivekanand.qrticket.enums.ScanLocation;
import com.vivekanand.qrticket.enums.ScanResult;

public interface TicketService {

    // Generate tickets and return QR images
    List<TicketInfo> generateTicket(TotalTicket totalTicket);

    // Universal scanner API (Gate + Museum)
    ScanResult scanTicket(String qrHash, ScanLocation location);
}
