package com.vivekanand.qrticket.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vivekanand.qrticket.entity.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, UUID>{

	
	Optional<Ticket> findByQrHashAndUsedFalse(String qrCodeHash);

	List<Ticket> findByUsed(Boolean used);

    Optional<Ticket> findByQrHash(
            String qrHash
    );

	
}
