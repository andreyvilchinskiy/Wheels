package Wheels.model;

import java.util.Objects;

public abstract class Vehicle implements Comparable<Vehicle> {

    protected String plateNumber;
    protected double dailyRate;

    public Vehicle(String plateNumber, double dailyRate) {
        this.plateNumber = plateNumber;
        this.dailyRate = dailyRate;
    }

    public abstract double calculateRentalCost(int days);

    public String getPlateNumber() {
        return plateNumber;
    }

    public double getDailyRate() {
        return dailyRate;
    }

    @Override
    public String toString() {
        return plateNumber + " — " + dailyRate + " ₽/сутки";
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Vehicle vehicle = (Vehicle) o;
        return Objects.equals(plateNumber, vehicle.plateNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hash(plateNumber);
    }

    @Override
    public int compareTo(Vehicle other) {
        return Double.compare(this.dailyRate, other.dailyRate);
    }
}