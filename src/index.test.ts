import { Booking, Room } from ".";

describe("isOccupied", () => {
	test("Is not ocupied, looking before first checkin", () => {
		const room = new Room({ name: "101", rate: 100, discount: 10 });
		const booking1 = new Booking({
			name: "Pepe",
			email: "a@a.com",
			checkIn: "2024-01-01",
			checkOut: "2024-01-03",
			discount: 10,
			room: room,
		});
		const booking2 = new Booking({
			name: "Pepa",
			email: "e@e.com",
			checkIn: "2024-01-05",
			checkOut: "2024-01-06",
			discount: 10,
			room: room,
		});
		const booking3 = new Booking({
			name: "Pepa",
			email: "e@e.com",
			checkIn: "2024-01-12",
			checkOut: "2024-02-20",
			discount: 10,
			room: room,
		});
		room.setBookings([booking1, booking2, booking3]);
		expect(room.isOccupied("2023-12-10")).toBe(false);
	});

	test("Is not ocupied, looking after last checkout", () => {
		const room = new Room({ name: "101", rate: 100, discount: 10 });
		const booking1 = new Booking({
			name: "Pepe",
			email: "a@a.com",
			checkIn: "2024-01-01",
			checkOut: "2024-01-03",
			discount: 10,
			room: room,
		});
		const booking2 = new Booking({
			name: "Pepa",
			email: "e@e.com",
			checkIn: "2024-01-05",
			checkOut: "2024-01-06",
			discount: 10,
			room: room,
		});
		const booking3 = new Booking({
			name: "Pepe",
			email: "a@a.com",
			checkIn: "2024-01-06",
			checkOut: "2024-01-09",
			discount: 10,
			room: room,
		});
		const booking4 = new Booking({
			name: "Pepe",
			email: "a@a.com",
			checkIn: "2024-01-12",
			checkOut: "2024-02-20",
			discount: 10,
			room: room,
		});
		room.setBookings([booking1, booking2, booking3, booking4]);
		expect(room.isOccupied("2024-03-01")).toBe(false);
	});

	test("Is not ocupied, looking between two bookings, different day", () => {
		const room = new Room({ name: "101", rate: 100, discount: 10 });
		const booking1 = new Booking({
			name: "Pepe",
			email: "a@a.com",
			checkIn: "2024-01-01",
			checkOut: "2024-01-03",
			discount: 10,
			room: room,
		});
		const booking2 = new Booking({
			name: "Pepa",
			email: "e@e.com",
			checkIn: "2024-01-05",
			checkOut: "2024-01-06",
			discount: 10,
			room: room,
		});
		const booking3 = new Booking({
			name: "Pepe",
			email: "a@a.com",
			checkIn: "2024-01-06",
			checkOut: "2024-01-09",
			discount: 10,
			room: room,
		});
		const booking4 = new Booking({
			name: "Pepe",
			email: "a@a.com",
			checkIn: "2024-01-12",
			checkOut: "2024-02-20",
			discount: 10,
			room: room,
		});
		room.setBookings([booking1, booking2, booking3, booking4]);
		expect(room.isOccupied("2024-01-11")).toBe(false);
	});

	test("Is not ocupied, looking between two bookings, same day", () => {
		const room = new Room({ name: "101", rate: 100, discount: 10 });
		const booking1 = new Booking({
			name: "Pepe",
			email: "a@a.com",
			checkIn: "2024-01-01",
			checkOut: "2024-01-03",
			discount: 10,
			room: room,
		});
		const booking2 = new Booking({
			name: "Pepa",
			email: "e@e.com",
			checkIn: "2024-01-05",
			checkOut: "2024-01-06",
			discount: 10,
			room: room,
		});
		const booking3 = new Booking({
			name: "Pepe",
			email: "a@a.com",
			checkIn: "2024-01-06",
			checkOut: "2024-01-09",
			discount: 10,
			room: room,
		});
		const booking4 = new Booking({
			name: "Pepe",
			email: "a@a.com",
			checkIn: "2024-01-12",
			checkOut: "2024-02-20",
			discount: 10,
			room: room,
		});
		room.setBookings([booking1, booking2, booking3, booking4]);
		expect(room.isOccupied("2024-01-03")).toBe(false);
	});

	test("Is ocupied, first day of first bookin", () => {
		const room = new Room({ name: "101", rate: 100, discount: 10 });
		const booking1 = new Booking({
			name: "Pepe",
			email: "a@a.com",
			checkIn: "2024-01-01",
			checkOut: "2024-01-03",
			discount: 10,
			room: room,
		});
		const booking2 = new Booking({
			name: "Pepa",
			email: "e@e.com",
			checkIn: "2024-01-05",
			checkOut: "2024-01-06",
			discount: 10,
			room: room,
		});
		const booking3 = new Booking({
			name: "Pepe",
			email: "a@a.com",
			checkIn: "2024-01-06",
			checkOut: "2024-01-09",
			discount: 10,
			room: room,
		});
		const booking4 = new Booking({
			name: "Pepe",
			email: "a@a.com",
			checkIn: "2024-01-12",
			checkOut: "2024-02-20",
			discount: 10,
			room: room,
		});
		room.setBookings([booking1, booking2, booking3, booking4]);
		expect(room.isOccupied("2024-01-01")).toBe(true);
	});

	test("Is ocupied, first day of last bookin", () => {
		const room = new Room({ name: "101", rate: 100, discount: 10 });
		const booking1 = new Booking({
			name: "Pepe",
			email: "a@a.com",
			checkIn: "2024-01-01",
			checkOut: "2024-01-03",
			discount: 10,
			room: room,
		});
		const booking2 = new Booking({
			name: "Pepa",
			email: "e@e.com",
			checkIn: "2024-01-05",
			checkOut: "2024-01-06",
			discount: 10,
			room: room,
		});
		const booking3 = new Booking({
			name: "Pepe",
			email: "a@a.com",
			checkIn: "2024-01-06",
			checkOut: "2024-01-09",
			discount: 10,
			room: room,
		});
		const booking4 = new Booking({
			name: "Pepe",
			email: "a@a.com",
			checkIn: "2024-01-12",
			checkOut: "2024-02-20",
			discount: 10,
			room: room,
		});
		room.setBookings([booking1, booking2, booking3, booking4]);
		expect(room.isOccupied("2024-01-12")).toBe(true);
	});
	test("Is ocupied, middle day of first booking", () => {
		const room = new Room({ name: "101", rate: 100, discount: 10 });
		const booking1 = new Booking({
			name: "Pepe",
			email: "a@a.com",
			checkIn: "2024-01-01",
			checkOut: "2024-01-03",
			discount: 10,
			room: room,
		});
		const booking2 = new Booking({
			name: "Pepa",
			email: "e@e.com",
			checkIn: "2024-01-05",
			checkOut: "2024-01-06",
			discount: 10,
			room: room,
		});
		const booking3 = new Booking({
			name: "Pepe",
			email: "a@a.com",
			checkIn: "2024-01-06",
			checkOut: "2024-01-09",
			discount: 10,
			room: room,
		});
		const booking4 = new Booking({
			name: "Pepe",
			email: "a@a.com",
			checkIn: "2024-01-12",
			checkOut: "2024-02-20",
			discount: 10,
			room: room,
		});
		room.setBookings([booking1, booking2, booking3, booking4]);
		expect(room.isOccupied("2024-01-02")).toBe(true);
	});
	test("Is ocupied, middle day of last booking", () => {
		const room = new Room({ name: "101", rate: 100, discount: 10 });
		const booking1 = new Booking({
			name: "Pepe",
			email: "a@a.com",
			checkIn: "2024-01-01",
			checkOut: "2024-01-03",
			discount: 10,
			room: room,
		});
		const booking2 = new Booking({
			name: "Pepa",
			email: "e@e.com",
			checkIn: "2024-01-05",
			checkOut: "2024-01-06",
			discount: 10,
			room: room,
		});
		const booking3 = new Booking({
			name: "Pepe",
			email: "a@a.com",
			checkIn: "2024-01-06",
			checkOut: "2024-01-09",
			discount: 10,
			room: room,
		});
		const booking4 = new Booking({
			name: "Pepe",
			email: "a@a.com",
			checkIn: "2024-01-12",
			checkOut: "2024-02-20",
			discount: 10,
			room: room,
		});
		room.setBookings([booking1, booking2, booking3, booking4]);
		expect(room.isOccupied("2024-01-14")).toBe(true);
	});
});

describe("occupancyPercentage", () => {
	const room = new Room({ name: "101", rate: 250, discount: 5 });
	const room2 = new Room({ name: "102", rate: 200, discount: 10 });
	const room3 = new Room({ name: "103", rate: 300, discount: 2 });
	const room4 = new Room({ name: "104", rate: 100, discount: 4 });
	const booking1 = new Booking({
		name: "Pepe",
		email: "a@a.com",
		checkIn: "2024-04-20",
		checkOut: "2024-04-25",
		discount: 10,
		room: room,
	});
	const booking2 = new Booking({
		name: "Pepa",
		email: "b@b.com",
		checkIn: "2024-04-15",
		checkOut: "2024-04-19",
		discount: 10,
		room: room2,
	});
	const booking3 = new Booking({
		name: "Papa",
		email: "p@p.com",
		checkIn: "2024-03-10",
		checkOut: "2024-03-15",
		discount: 10,
		room: room3,
	});
	const booking4 = new Booking({
		name: "Pupa",
		email: "u@a.com",
		checkIn: "2024-04-25",
		checkOut: "2024-04-30",
		discount: 10,
		room: room4,
	});
	room.setBookings([booking1, booking2, booking3, booking4]);
	room2.setBookings([booking1, booking2, booking3, booking4]);
	room3.setBookings([booking1, booking2, booking3, booking4]);
	room4.setBookings([booking1, booking2, booking3, booking4]);

	test("should retuyrn percentage of days with occupancy within the range provided 100%", () => {
		const result = room.occupancyPercentage("2024-04-20", "2024-04-25");
		expect(result).toBe(100);
	});

	test("should retuyrn percentage of days with occupancy within the range provided 100%", () => {
		const result2 = room.occupancyPercentage("2024-04-15", "2024-04-19");

		expect(result2).toBe(100);
	});
	test("should retuyrn percentage of days with occupancy within the range provided 75%", () => {
		const result3 = room.occupancyPercentage("2024-03-9", "2024-03-13");

		expect(result3).toBe(75);
	});
});
describe("totalOccupancyPercentage", () => {});

describe("availableRooms", () => {
	const room = new Room({ name: "101", rate: 250, discount: 5 });
	const room2 = new Room({ name: "102", rate: 200, discount: 10 });
	const room3 = new Room({ name: "103", rate: 300, discount: 2 });
	const room4 = new Room({ name: "104", rate: 100, discount: 4 });
	const booking1 = new Booking({
		name: "Pepe",
		email: "a@a.com",
		checkIn: "2024-04-20",
		checkOut: "2024-04-25",
		discount: 10,
		room: room,
	});
	const booking2 = new Booking({
		name: "Pepa",
		email: "b@b.com",
		checkIn: "2024-04-15",
		checkOut: "2024-04-19",
		discount: 10,
		room: room2,
	});
	const booking3 = new Booking({
		name: "Papa",
		email: "p@p.com",
		checkIn: "2024-03-10",
		checkOut: "2024-03-15",
		discount: 10,
		room: room3,
	});
	const booking4 = new Booking({
		name: "Pupa",
		email: "u@a.com",
		checkIn: "2024-04-25",
		checkOut: "2024-04-30",
		discount: 10,
		room: room4,
	});
	room.setBookings([booking1, booking2, booking3, booking4]);
	room2.setBookings([booking1, booking2, booking3, booking4]);
	room3.setBookings([booking1, booking2, booking3, booking4]);
	room4.setBookings([booking1, booking2, booking3, booking4]);
	test("should return 4", () => {
		const availableRooms: Room[] = Room.availableRooms({
			rooms: [room, room2, room3, room4],
			startDate: "2024-04-20",
			endDate: "2024-04-25",
		});
		expect(availableRooms.length).toBe(4);
	});
});
