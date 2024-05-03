const TIME = require("./constants/time");

const BOOKINS = [
	{
		checkInDate: "2024-04-20",
		checkOutDate: "2024-04-25",
	},
	{
		checkInDate: "2024-04-15",
		checkOutDate: "2024-04-19",
	},
	{
		checkInDate: "2024-03-9",
		checkOutDate: "2024-03-13",
	},
	{
		checkInDate: "2024-06-01",
		checkOutDate: "2024-06-03",
	},
	{
		checkInDate: "2024-06-10",
		checkOutDate: "2024-06-12",
	},
];
class Room {
	constructor({ name, rate, discount }) {
		this.name = name;
		this.bookings = [];
		this.rate = rate;
		this.discount = discount;
	}
	setBookings(bookings = []) {
		bookings.forEach((booking) => {
			this.bookings.push(booking);
		});
	}
	isOccupied(date) {
		const dateToCheck = new Date(date).getTime();
		const isOccupied = this.bookings.some((booking) => {
			const bookingStart = new Date(booking.checkIn).getTime();
			const bookingEnd = new Date(booking.checkOut).getTime();

			if (dateToCheck >= bookingStart && dateToCheck < bookingEnd) {
				return true;
			}
			return false;
		});
		return isOccupied;
	}
	occupancyPercentage(startDate, endDate) {
		const startDatee = new Date(startDate).getTime();
		const endDatee = new Date(endDate).getTime();

		const totalDays =
			(endDatee - startDatee) /
				(TIME.SECOND * TIME.MINUTE * TIME.HOUR * TIME.DAY) +
			1;
		let daysOccupied = 0;

		this.bookings.forEach((booking) => {
			const bookingStart = new Date(booking.checkIn).getTime();
			const bookingEnd = new Date(booking.checkOut).getTime();

			if (startDatee <= bookingEnd && endDatee >= bookingStart) {
				const overlapStart = Math.max(startDatee, bookingStart);

				const overlapEnd = Math.min(endDatee, bookingEnd);

				const overlapDays =
					(overlapEnd - overlapStart) / (1000 * 60 * 60 * 24) + 1;

				daysOccupied += overlapDays;
			}
		});
		const occupancyPercentage = (daysOccupied / totalDays) * 100;
		// return { occupancyPercentage, daysOccupied, totalDays };
		return Math.ceil(occupancyPercentage);
	}
	static totalOccupancyPercentage({ rooms = [], startDate, endDate }) {
		const TOTAL_ROOMS = rooms.length; //100%

		const startDatee = new Date(startDate).getTime();
		const endDatee = new Date(endDate).getTime();

		const roomsOcupied = rooms.filter((room) => {
			const roomStartDate = new Date(room.checkInDate).getTime();
			const roomsEndDate = new Date(room.checkOutDate).getTime();
			if (startDatee < roomsEndDate && endDatee >= roomStartDate) {
				return room;
			}
		});

		const totalOcupiedRooms = roomsOcupied.length;
		return Math.ceil((totalOcupiedRooms * 100) / TOTAL_ROOMS);
	}
	static availableRooms({ rooms = [], startDate, endDate }) {
		const startDatee = new Date(startDate).getTime();
		const endDatee = new Date(endDate).getTime();

		const roomsNotOcupied = rooms.filter((room) => {
			const roomStartDate = new Date(room.checkInDate).getTime();
			const roomsEndDate = new Date(room.checkOutDate).getTime();

			if (startDatee < roomsEndDate && endDatee >= roomStartDate) {
				return;
			}
			return room;
		});

		return roomsNotOcupied;
	}
}

class Booking {
	constructor({ name, email, checkIn, checkOut, discount, room }) {
		this.name = name;
		this.email = email;
		this.checkIn = checkIn;
		this.checkOut = checkOut;
		this.discount = discount;
		this.room = room;
	}
	get fee() {
		const baseDiscount = this.room.discount + this.discount;
		const baseFee = this.room.rate;

		const totalDescount = (baseDiscount * baseFee) / 100;
		return console.log(baseDiscount, baseFee, totalDescount);
	}
}

const room1 = new Room({ name: "101", rate: 250, discount: 5 });
const room2 = new Room({ name: "102", rate: 150, discount: 15 });

const booking1 = new Booking({
	name: "Pepe",
	email: "a@a.com",
	checkIn: "2024-04-27",
	checkOut: "2024-04-29",
	discount: 10,
	room: room1,
});
const booking2 = new Booking({
	name: "Pepa",
	email: "b@b.com",
	checkIn: "2024-04-22",
	checkOut: "2024-04-26",
	discount: 10,
	room: room2,
});

room1.setBookings([booking1, booking2]);
// room2.setBookings([booking1, booking2]);

const totalOcupacyPercetage = Room.totalOccupancyPercentage({
	rooms: BOOKINS,
	startDate: "2024-04-27",
	endDate: "2024-04-30",
});
const availableRooms = Room.availableRooms({
	rooms: BOOKINS,
	startDate: "2024-04-27",
	endDate: "2024-04-30",
});
console.log(room1.isOccupied("2024-04-28"));

// console.log(totalOcupacyPercetage);
console.log(room1.occupancyPercentage("2024-04-20", "2024-04-25"));

// console.log(availableRooms);

// console.log(`Room ${booking1.fee}`);
// console.log(`Room ${booking2.fee}`);

module.exports = { Room, Booking };
