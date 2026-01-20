package com.vivekanand.qrticket.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vivekanand.qrticket.entity.EntryLog;
import com.vivekanand.qrticket.entity.Ticket;

public interface EntryLogRepository extends JpaRepository<EntryLog, UUID> {

	  List<EntryLog> findAllByTicket(Ticket ticket);
	  boolean existsByTicket( Ticket ticket);
	  
}
