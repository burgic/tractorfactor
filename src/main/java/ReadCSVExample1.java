import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class ReadCSVExample1 {


    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(new File("/Users/christianburgin/codeclan_work/week_15/McCormickTest.csv"));
        sc.useDelimiter(",");
        while (sc.hasNext()) {
            System.out.print(sc.next());
        }
//        sc.close();
//        List<List<String>> records = new ArrayList<>();
//        try (Scanner scanner = new Scanner(new File("/Users/christianburgin/codeclan_work/week_15/McCormickTest.csv"));) {
//            while (scanner.hasNextLine()) {
//                records.add(getRecordFromLine(scanner.nextLine()));
//            }
//        }
//    }
//
//    public ArrayList bollocks() {
//        ArrayList<String> fileData = new ArrayList<>();


//        try (Scanner sc = new Scanner(new File("/Users/christianburgin/codeclan_work/week_15/McCormickTest.csv"));) {
//            sc.useDelimiter(",");
//            while (sc.hasNext()) {
//                fileData.add(sc.next());
//                System.out.print(sc.next());
//            }
//            sc.close();
//            System.out.println(fileData);
//            return fileData;
//
//        }
//    }
    }

    private List<String> getRecordFromLine(String line) {
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


