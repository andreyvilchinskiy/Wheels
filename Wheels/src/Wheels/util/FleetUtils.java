package Wheels.util;

import java.util.Comparator;
import java.util.List;

public final class FleetUtils {

    private FleetUtils() {}

    /**
     * Находит элемент списка с наименьшим значением по переданному компаратору.
     * Реализовано вручную, без использования Collections.min().
     */
    public static <T> T findCheapest(List<T> list, Comparator<T> comparator) {
        if (list == null || list.isEmpty()) {
            return null;
        }

        T cheapest = list.get(0);
        for (int i = 1; i < list.size(); i++) {
            if (comparator.compare(list.get(i), cheapest) < 0) {
                cheapest = list.get(i);
            }
        }
        return cheapest;
    }
}