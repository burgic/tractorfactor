package com.codeclan.example.TractorFinder.repositories;

import com.codeclan.example.TractorFinder.models.Tractor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TractorRepository extends JpaRepository <Tractor, Long> {

}
