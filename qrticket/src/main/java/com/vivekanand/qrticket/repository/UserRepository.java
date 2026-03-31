package com.vivekanand.qrticket.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vivekanand.qrticket.entity.AppUser;

public interface UserRepository extends JpaRepository<AppUser, String>{

}
