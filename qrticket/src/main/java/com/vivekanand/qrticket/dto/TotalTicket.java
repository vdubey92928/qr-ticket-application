package com.vivekanand.qrticket.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.vivekanand.qrticket.enums.TicketValidFor;

public class TotalTicket {

    private int adult;
    private int kid;
    private TicketValidFor validFor;
    private LocalDate visitDate;

    public int getAdult() { return adult; }
    public void setAdult(int adult) { this.adult = adult; }

    public int getKid() { return kid; }
    public void setKid(int kid) { this.kid = kid; }

    public TicketValidFor getValidFor() { return validFor; }
    public void setValidFor(TicketValidFor validFor) { this.validFor = validFor; }
	public LocalDate getVisitDate() {
		return visitDate;
	}
	public void setVisitDate(LocalDate visitDate) {
		this.visitDate = visitDate;
	}
}
