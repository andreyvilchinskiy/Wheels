package Wheels.model;

public class Car extends Vehicle implements Insurable {

    private int seats;

    public Car(String plateNumber, double dailyRate, int seats) {
        super(plateNumber, dailyRate);
        this.seats = seats;
    }

    @Override
    public double calculateRentalCost(int days) {
        double sum = dailyRate * days;
        if (days > 7) {
            sum *= 0.9;
        }
        return sum;
    }

    @Override
    public double getInsuranceFee() {
        return dailyRate * 0.05;
    }

    @Override
    public String toString() {
        return super.toString() + " [Car, мест: " + seats + "]";
    }
}