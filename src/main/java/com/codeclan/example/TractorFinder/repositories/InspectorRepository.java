package com.codeclan.example.TractorFinder.repositories;

import com.codeclan.example.TractorFinder.models.Inspector;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InspectorRepository extends JpaRepository<Inspector, Long> {
    List<Inspector> findByLatGreaterThanAndLatLessThanAndLngGreaterThanAndLngLessThan(double minLat, double maxLat, double minLng, double maxLng);
    List<Inspector> findByTractorsManufacturerAndLatGreaterThanAndLatLessThanAndLngGreaterThanAndLngLessThan(String manufacturer, double minLat, double maxLat, double minLng, double maxLng);
}
