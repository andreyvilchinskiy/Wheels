class Vehicle {
    constructor(plate, rate) {
        this.plate = plate;
        this.rate = rate;
    }
    toString()      { return `${this.plate} — ${this.rate} ₽/сутки`; }
    cost(days)      { return this.rate * days; }
    insurance()     { return 0; }
    type()          { return "Vehicle"; }
    details()       { return ""; }
    isInsurable()   { return false; }
}

class Car extends Vehicle {
    constructor(plate, rate, seats) {
        super(plate, rate);
        this.seats = seats;
    }
    cost(days)   {
        let s = this.rate * days;
        if (days > 7) s *= 0.9;
        return s;
    }
    insurance()  { return this.rate * 0.05; }
    type()       { return "Car"; }
    details()    { return `мест: ${this.seats}`; }
    isInsurable(){ return true; }
}

class Motorcycle extends Vehicle {
    constructor(plate, rate, vol) {
        super(plate, rate);
        this.vol = vol;
    }
    type()    { return "Motorcycle"; }
    details() { return `объём: ${this.vol} л`; }
}

class Truck extends Vehicle {
    constructor(plate, rate, tons) {
        super(plate, rate);
        this.tons = tons;
    }
    cost(days)   { return this.rate * days + 500 * days; }
    insurance()  { return this.rate * 0.08; }
    type()       { return "Truck"; }
    details()    { return `тонн: ${this.tons}`; }
    isInsurable(){ return true; }
}

let fleet = [
    new Car("А123БВ77", 2500, 5),
    new Car("В456ГД99", 3200, 7),
    new Motorcycle("Е789ЖЗ50", 1200, 0.6),
    new Truck("И321КЛ77", 5000, 10),
    new Truck("М654НО99", 4500, 5),
];

let serviceQueue = [];

function renderFleet() {
    const tbody = document.querySelector("#fleetTable tbody");
    tbody.innerHTML = "";
    for (const v of fleet) {
        const badgeClass = v.type() === "Truck" ? "truck"
                        : v.type() === "Motorcycle" ? "moto" : "";
        const insurance = v.isInsurable() ? v.insurance().toFixed(2) : "—";
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${v.plate}</td>
            <td><span class="badge ${badgeClass}">${v.type()}</span></td>
            <td>${v.rate}</td>
            <td>${v.details()}</td>
            <td>${v.cost(10).toFixed(2)}</td>
            <td>${insurance}</td>`;
        tbody.appendChild(tr);
    }
}

function addRandom() {
    const types = ["car", "moto", "truck"];
    const t = types[Math.floor(Math.random() * 3)];
    const plate = "Х" + Math.floor(100 + Math.random() * 900)
                + "УК" + Math.floor(10 + Math.random() * 90);

    if (t === "car")   fleet.push(new Car(plate, Math.round(2000 + Math.random() * 2000), 4 + Math.floor(Math.random() * 3)));
    if (t === "moto")  fleet.push(new Motorcycle(plate, Math.round(800 + Math.random() * 1000), Number((0.4 + Math.random() * 0.8).toFixed(1))));
    if (t === "truck") fleet.push(new Truck(plate, Math.round(4000 + Math.random() * 3000), Number((3 + Math.random() * 10).toFixed(1))));

    renderFleet();
    document.getElementById("platesOut").textContent = "—";
}

function checkPlates() {
    const unique = new Set(fleet.map(v => v.plate));
    const map = new Map(fleet.map(v => [v.plate, v]));
    document.getElementById("platesOut").textContent =
        `Всего машин: ${fleet.length}\n` +
        `Уникальных номеров: ${unique.size}\n` +
        `Дубликаты: ${unique.size === fleet.length ? "нет" : "есть"}\n` +
        `Map построен: ${map.size} записей`;
}

function searchByPlate() {
    const plate = document.getElementById("searchPlate").value.trim();
    const map = new Map(fleet.map(v => [v.plate, v]));
    const found = map.get(plate);
    document.getElementById("platesOut").textContent = found
        ? `Найдено: ${found.toString()} [${found.type()}, ${found.details()}]`
        : `Автомобиль с номером "${plate}" не найден.`;
}

function testEquals() {
    const a = new Car("А123БВ77", 2500, 5);
    const b = new Car("А123БВ77", 9999, 2);
    const set = new Set([a.plate, b.plate]);
    document.getElementById("equalsOut").textContent =
        `Добавлено 2 объекта с номером "А123БВ77",\n` +
        `но разными полями (ставка/места).\n` +
        `set.size() = ${set.size} → ` +
        `${set.size === 1 ? "equals/hashCode работают верно" : "ошибка"}`;
}

function resetQueue() {
    serviceQueue = [fleet[0], fleet[2], fleet[3]].filter(Boolean);
    renderQueue();
}

function serviceNext() {
    if (serviceQueue.length === 0) resetQueue();
    const v = serviceQueue.shift();
    renderQueue(v ? `Обслужен: ${v.toString()}` : "Очередь пуста");
}

function renderQueue(msg) {
    const box = document.getElementById("queueBox");
    box.innerHTML = serviceQueue.length
        ? serviceQueue.map((v, i) =>
            `<div class="queue-item">${i + 1}. ${v.toString()} [${v.type()}]</div>`).join("")
        : `<div class="queue-item">Очередь пуста</div>`;
    if (msg) box.insertAdjacentHTML("afterbegin",
        `<div class="output" style="margin-bottom:8px;">${msg}</div>`);
}

function sortByRate() {
    const sorted = [...fleet].sort((a, b) => a.rate - b.rate);
    document.getElementById("sortOut").textContent =
        "По ставке (дешёвые → дорогие):\n" +
        sorted.map(v => "  " + v.toString()).join("\n");
}

function sortByPlate() {
    const sorted = [...fleet].sort((a, b) => a.plate.localeCompare(b.plate));
    document.getElementById("sortOut").textContent =
        "По номеру (алфавитный порядок):\n" +
        sorted.map(v => "  " + v.toString()).join("\n");
}

function findCheapest() {
    if (fleet.length === 0) return;
    let cheapest = fleet[0];
    for (let i = 1; i < fleet.length; i++) {
        if (fleet[i].rate < cheapest.rate) cheapest = fleet[i];
    }
    document.getElementById("cheapOut").textContent =
        `Самый дешёвый: ${cheapest.toString()} ` +
        `[${cheapest.type()}, ${cheapest.details()}]`;
}

renderFleet();
resetQueue();