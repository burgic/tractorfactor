package com.codeclan.example.TractorFinder;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class ReadCSV{

    public ReadCSV(){

    }

    public List<String> getRecordFromLine(String line) {
        List<String> values = new ArrayList<String>();
        try (Scanner rowScanner = new Scanner(line)) {
            rowScanner.useDelimiter(",");
            while (rowScanner.hasNext()) {
                values.add(rowScanner.next());
            }
        }
        return values;
    }
}
