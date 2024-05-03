const { Room, Booking } = require("./index");

const bookings = [
	{
		checkIn: "2024-04-20",
		checkOut: "2024-04-26",
	},
	{
		checkIn: "2024-04-15",
		checkOut: "2024-04-19",
	},
	{
		checkIn: "2024-03-10",
		checkOut: "2024-03-15",
	},
];

test("occupancyPercentage within the range of dates provided ", () => {
	const room = new Room({ name: "101", bookings, rate: 100, discount: 10 });

	const result = room.occupancyPercentage("2024-04-20", "2024-04-25");
	const result2 = room.occupancyPercentage("2024-04-15", "2024-04-19");
	const result3 = room.occupancyPercentage("2024-03-9", "2024-03-13");

	expect(result).toBe(100);
	expect(result2).toBe(100);
	expect(result3).toBe(80);
});

test("isOcupied on a specific date", () => {
	const room = new Room({ name: "101", bookings, rate: 100, discount: 10 });

	const result = room.isOccupied("2024-04-20");
	const result2 = room.isOccupied("2024-04-15");
	const result3 = room.isOccupied("2024-03-9");

	expect(result).toBe(true);
	expect(result2).toBe(true);
	expect(result3).toBe(false);
});

test("Is not ocupied, looking before first checkin", () => {
	const room = new Room({ name: "101", rate: 100, discount: 10 });
	const booking1 = new Booking({
		checkIn: "2024-01-01",
		checkOut: "2024-01-03",
	});
	const booking2 = new Booking({
		checkIn: "2024-01-05",
		checkOut: "2024-01-06",
	});
	const booking3 = new Booking({
		checkIn: "2024-01-12",
		checkOut: "2024-02-20",
	});
	room.setBookings([booking1, booking2, booking3]);
	expect(room.isOccupied("2023-12-10")).toBe(false);
});

test("Is not ocupied, looking after last checkout", () => {
	const room = new Room({ name: "101", rate: 100, discount: 10 });
	const booking1 = new Booking({
		checkIn: "2024-01-01",
		checkOut: "2024-01-03",
	});
	const booking2 = new Booking({
		checkIn: "2024-01-05",
		checkOut: "2024-01-06",
	});
	const booking3 = new Booking({
		checkIn: "2024-01-06",
		checkOut: "2024-01-09",
	});
	const booking4 = new Booking({
		checkIn: "2024-01-12",
		checkOut: "2024-02-20",
	});
	room.setBookings([booking1, booking2, booking3, booking4]);
	expect(room.isOccupied("2024-03-01")).toBe(false);
});

test("Is not ocupied, looking between two bookings, different day", () => {
	const room = new Room({ name: "101", rate: 100, discount: 10 });
	const booking1 = new Booking({
		checkIn: "2024-01-01",
		checkOut: "2024-01-03",
	});
	const booking2 = new Booking({
		checkIn: "2024-01-05",
		checkOut: "2024-01-06",
	});
	const booking3 = new Booking({
		checkIn: "2024-01-06",
		checkOut: "2024-01-09",
	});
	const booking4 = new Booking({
		checkIn: "2024-01-12",
		checkOut: "2024-02-20",
	});
	room.setBookings([booking1, booking2, booking3, booking4]);
	expect(room.isOccupied("2024-01-11")).toBe(false);
});

test("Is not ocupied, looking between two bookings, same day", () => {
	const room = new Room({ name: "101", rate: 100, discount: 10 });
	const booking1 = new Booking({
		checkIn: "2024-01-01",
		checkOut: "2024-01-03",
	});
	const booking2 = new Booking({
		checkIn: "2024-01-05",
		checkOut: "2024-01-06",
	});
	const booking3 = new Booking({
		checkIn: "2024-01-06",
		checkOut: "2024-01-09",
	});
	const booking4 = new Booking({
		checkIn: "2024-01-12",
		checkOut: "2024-02-20",
	});
	room.setBookings([booking1, booking2, booking3, booking4]);
	expect(room.isOccupied("2024-01-03")).toBe(false);
});

test("Is ocupied, first day of first bookin", () => {
	const room = new Room({ name: "101", rate: 100, discount: 10 });
	const booking1 = new Booking({
		checkIn: "2024-01-01",
		checkOut: "2024-01-03",
	});
	const booking2 = new Booking({
		checkIn: "2024-01-05",
		checkOut: "2024-01-06",
	});
	const booking3 = new Booking({
		checkIn: "2024-01-06",
		checkOut: "2024-01-09",
	});
	const booking4 = new Booking({
		checkIn: "2024-01-12",
		checkOut: "2024-02-20",
	});
	room.setBookings([booking1, booking2, booking3, booking4]);
	expect(room.isOccupied("2024-01-01")).toBe(true);
});

test("Is ocupied, first day of last bookin", () => {
	const room = new Room({ name: "101", rate: 100, discount: 10 });
	const booking1 = new Booking({
		checkIn: "2024-01-01",
		checkOut: "2024-01-03",
	});
	const booking2 = new Booking({
		checkIn: "2024-01-05",
		checkOut: "2024-01-06",
	});
	const booking3 = new Booking({
		checkIn: "2024-01-06",
		checkOut: "2024-01-09",
	});
	const booking4 = new Booking({
		checkIn: "2024-01-12",
		checkOut: "2024-02-20",
	});
	room.setBookings([booking1, booking2, booking3, booking4]);
	expect(room.isOccupied("2024-01-12")).toBe(true);
});
test("Is ocupied, middle day of first booking", () => {
	const room = new Room({ name: "101", rate: 100, discount: 10 });
	const booking1 = new Booking({
		checkIn: "2024-01-01",
		checkOut: "2024-01-03",
	});
	const booking2 = new Booking({
		checkIn: "2024-01-05",
		checkOut: "2024-01-06",
	});
	const booking3 = new Booking({
		checkIn: "2024-01-06",
		checkOut: "2024-01-09",
	});
	const booking4 = new Booking({
		checkIn: "2024-01-12",
		checkOut: "2024-02-20",
	});
	room.setBookings([booking1, booking2, booking3, booking4]);
	expect(room.isOccupied("2024-01-02")).toBe(true);
});
test("Is ocupied, middle day of last booking", () => {
	const room = new Room({ name: "101", rate: 100, discount: 10 });
	const booking1 = new Booking({
		checkIn: "2024-01-01",
		checkOut: "2024-01-03",
	});
	const booking2 = new Booking({
		checkIn: "2024-01-05",
		checkOut: "2024-01-06",
	});
	const booking3 = new Booking({
		checkIn: "2024-01-06",
		checkOut: "2024-01-09",
	});
	const booking4 = new Booking({
		checkIn: "2024-01-12",
		checkOut: "2024-02-20",
	});
	room.setBookings([booking1, booking2, booking3, booking4]);
	expect(room.isOccupied("2024-01-14")).toBe(true);
});
