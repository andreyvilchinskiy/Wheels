package Wheels.comparator;

import Wheels.model.Vehicle;
import java.util.Comparator;

public class ByPlateComparator implements Comparator<Vehicle> {

    @Override
    public int compare(Vehicle a, Vehicle b) {
        return a.getPlateNumber().compareTo(b.getPlateNumber());
    }
}