const Room = require("./index");
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

describe("Room", () => {
	test("occupancyPercentage within the range of dates provided ", () => {
		const room = new Room({ name: "101", bookings, rate: 100, discount: 10 });

		const result = room.occupancyPercentage("2024-04-20", "2024-04-25");
		const result2 = room.occupancyPercentage("2024-04-15", "2024-04-19");
		const result3 = room.occupancyPercentage("2024-03-9", "2024-03-13");

		expect(result).toBe(100);
		expect(result2).toBe(100);
		expect(result3).toBe(80);
	});
});
