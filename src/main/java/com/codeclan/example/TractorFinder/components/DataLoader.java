package com.codeclan.example.TractorFinder.components;

import com.codeclan.example.TractorFinder.ReadCSV;
import com.codeclan.example.TractorFinder.models.Inspector;
import com.codeclan.example.TractorFinder.models.Tractor;
import com.codeclan.example.TractorFinder.repositories.InspectorRepository;
import com.codeclan.example.TractorFinder.repositories.TractorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;


import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Scanner;

@Component
public class DataLoader implements ApplicationRunner {

    @Autowired
    TractorRepository tractorRepository;

    @Autowired
    InspectorRepository inspectorRepository;

    public DataLoader() {

    }


    public void run(ApplicationArguments args) throws FileNotFoundException {
        Tractor tractor1 = new Tractor("Massey Ferguson");
        tractorRepository.save(tractor1);
        Tractor tractor2 = new Tractor("Fendt");
        tractorRepository.save(tractor2);
        Tractor tractor3 = new Tractor("John Deere");
        tractorRepository.save(tractor3);
        Tractor tractor4 = new Tractor("Case");
        tractorRepository.save(tractor4);
        Tractor tractor5 = new Tractor("McCormick");
        tractorRepository.save(tractor5);
        Tractor tractor6 = new Tractor("Claas");
        tractorRepository.save(tractor6);

//        Inspector inspector1 = new Inspector("Morse", "FK14 7NZ", "1 I Heart Tractors Wayyyyy", "012346847284", "Morse@tractors.com", 56.143209, -3.634701);
//        inspectorRepository.save(inspector1);
//        inspector1.addTractor(tractor1);
//        inspectorRepository.save(inspector1);
//        inspector1.addTractor(tractor4);
//        inspectorRepository.save(inspector1);
//
//        Inspector inspector2 = new Inspector("Gadget", "FK5 4XE", "19 fun with tractors lane, Tractorton, Farmshire", "0875634959273", "Gadget@tractorfun.com", 56.037247, -3.819953);
//        inspectorRepository.save(inspector2);
//
//        Inspector inspector3 = new Inspector("Poirot", "EH4 1HY", "21 joy with tractors road, Tractor City, West Farmerton", "087563495444", "Hercule@tractormurders.com", 55.958538, -3.212202);
//        inspectorRepository.save(inspector3);

        ReadCSV readCSV = new ReadCSV();
//        Scanner sc = new Scanner(new File("/Users/christianburgin/codeclan_work/week_15/McCormickTest.csv"));
        Scanner sc = new Scanner(new File("/Users/user/codeclan_work/project_3/tractorfactor/McCormickTest.csv"));
        sc.useDelimiter(",");
        List<List<String>> Info = new ArrayList<>();
        while (sc.hasNext()) {
            Info.add(readCSV.getRecordFromLine(sc.nextLine()));
        }
        System.out.println(Info);

        for (int i = 1; i < Info.size(); i++) {
            Inspector inspector = new Inspector(Info.get(i).get(0).toLowerCase(Locale.ROOT),
                    Info.get(i).get(1),
                    Info.get(i).get(2),
                    Info.get(i).get(3),
                    Info.get(i).get(4),
                    Double.parseDouble(Info.get(i).get(5)),
                    Double.parseDouble(Info.get(i).get(6))  );
            inspectorRepository.save(inspector);
            inspector.addTractor(tractor5);
            inspector.addTractorId(5);
            inspectorRepository.save(inspector);
            }

        ReadCSV readCSV2 = new ReadCSV();
//        Scanner sc2 = new Scanner(new File("/Users/christianburgin/codeclan_work/week_15/UKClaas.csv"));
        Scanner sc2 = new Scanner(new File("/Users/user/codeclan_work/project_3/tractorfactor/UKClaas.csv"));
        sc2.useDelimiter(",");
        List<List<String>> Info2 = new ArrayList<>();
        while (sc2.hasNext()) {
            Info2.add(readCSV2.getRecordFromLine(sc2.nextLine()));
        }
        System.out.println(Info2);

        for (int i = 1; i < Info2.size(); i++) {
            Inspector inspector = new Inspector(Info2.get(i).get(0).toLowerCase(Locale.ROOT),
                    Info2.get(i).get(1),
                    Info2.get(i).get(2),
                    Info2.get(i).get(3),
                    Info2.get(i).get(4),
                    Double.parseDouble(Info2.get(i).get(5)),
                    Double.parseDouble(Info2.get(i).get(6))  );
            inspectorRepository.save(inspector);
            inspector.addTractor(tractor6);
            inspector.addTractorId(6);
            inspectorRepository.save(inspector);
        }
        }
    }