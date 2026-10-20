package Wheels.model;

public class Motorcycle extends Vehicle {

    private double engineVolume;

    public Motorcycle(String plateNumber, double dailyRate, double engineVolume) {
        super(plateNumber, dailyRate);
        this.engineVolume = engineVolume;
    }

    @Override
    public double calculateRentalCost(int days) {
        return dailyRate * days;
    }

    @Override
    public String toString() {
        return super.toString() + " [Motorcycle, объём: " + engineVolume + " л]";
    }
}