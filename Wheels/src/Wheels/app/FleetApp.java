package Wheels.app;

import Wheels.comparator.ByPlateComparator;
import Wheels.model.*;
import Wheels.util.FleetUtils;

import java.util.*;

public class FleetApp {

    public static void main(String[] args) {
        // Инициализация автопарка
        List<Vehicle> fleet = new ArrayList<>();
        fleet.add(new Car("А123БВ77", 2500, 5));
        fleet.add(new Car("В456ГД99", 3200, 7));
        fleet.add(new Motorcycle("Е789ЖЗ50", 1200, 0.6));
        fleet.add(new Truck("И321КЛ77", 5000, 10));
        fleet.add(new Truck("М654НО99", 4500, 5));

        System.out.println("=== Автопарк ===");
        for (Vehicle v : fleet) {
            System.out.println(v);
        }

        // Уникальность номеров и поиск (Set, Map)
        System.out.println("\n=== Уникальность и поиск ===");
        Set<String> uniquePlates = new HashSet<>();
        for (Vehicle v : fleet) {
            uniquePlates.add(v.getPlateNumber());
        }
        System.out.println("Уникальных номеров: " + uniquePlates.size()
                + " из " + fleet.size()
                + (uniquePlates.size() == fleet.size() ? " (дубликатов нет)" : " (есть дубликаты)"));

        Map<String, Vehicle> byPlate = new HashMap<>();
        for (Vehicle v : fleet) {
            byPlate.put(v.getPlateNumber(), v);
        }
        System.out.println("Поиск по номеру А123БВ77: " + byPlate.get("А123БВ77"));

        // equals/hashCode и очередь
        System.out.println("\n=== equals/hashCode и очередь ===");
        Set<Vehicle> vehicleSet = new HashSet<>();
        vehicleSet.add(new Car("А123БВ77", 2500, 5));
        vehicleSet.add(new Car("А123БВ77", 9999, 2));
        System.out.println("set.size() = " + vehicleSet.size() + " (ожидается 1)");

        Queue<Vehicle> serviceQueue = new LinkedList<>();
        serviceQueue.offer(fleet.get(0));
        serviceQueue.offer(fleet.get(2));
        serviceQueue.offer(fleet.get(3));
        while (!serviceQueue.isEmpty()) {
            System.out.println("Обслужен: " + serviceQueue.poll());
        }

        // Сортировка
        System.out.println("\n=== Сортировка по ставке ===");
        Collections.sort(fleet);
        for (Vehicle v : fleet) {
            System.out.println(v);
        }

        System.out.println("\n=== Сортировка по номеру ===");
        Collections.sort(fleet, new ByPlateComparator());
        for (Vehicle v : fleet) {
            System.out.println(v);
        }

        // Обобщённый поиск
        System.out.println("\n=== Самый дешёвый ===");
        Vehicle cheapest = FleetUtils.findCheapest(fleet, Comparator.comparingDouble(Vehicle::getDailyRate));
        System.out.println(cheapest);

        /*
         * ОТВЕТ НА ЧАСТЬ Ж:
         * Цикл вывода fleet не содержит проверок instanceof или if, потому что toString()
         * является виртуальным методом. JVM во время выполнения сама выбирает нужную
         * реализацию метода в зависимости от фактического типа объекта (Car, Motorcycle, Truck),
         * а не от типа ссылки (Vehicle). Это и есть проявление полиморфизма.
         */
    }
}