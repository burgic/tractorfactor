package com.codeclan.example.TractorFinder;

import com.codeclan.example.TractorFinder.models.Inspector;
import com.codeclan.example.TractorFinder.repositories.InspectorRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class TractorFinderApplicationTests {

	@Autowired
	InspectorRepository inspectorRepository;

	@Test
	void contextLoads() {
	}

	@Test
	public void canFindInspectorsWithLatGreaterThanAndShorterAndLngGreaterThanAndShorterThan(){
		List<Inspector> inspectors = inspectorRepository.findByLatGreaterThanAndLatLessThanAndLngGreaterThanAndLngLessThan(54.5, 56.5, -4.5, -2.5);
		assertEquals(5, inspectors.size() );
	}

	@Test
	public void canFindInspectorsByTractorWithLatGreaterThanAndShorterAndLngGreaterThanAndShorterThan(){
		List<Inspector> inspectors = inspectorRepository.findByTractorsManufacturerAndLatGreaterThanAndLatLessThanAndLngGreaterThanAndLngLessThan("McCormick", 54.5, 56.5, -4.5, -2.5);
		assertEquals(5, inspectors.size());
	}

}
