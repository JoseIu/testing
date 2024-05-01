const TIME = require("./constants/time");
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
}

class Booking {
	constructor({ name, email, checkIn, checkOut, discount }) {
		this.name = name;
		this.email = email;
		this.checkIn = checkIn;
		this.checkOut = checkOut;
		this.discount = discount;
	}
}

const room = new Room({ name: "101", rate: 100, discount: 10 });
const booking = new Booking({
	name: "Pepe",
	email: "a@a.com",
	checkIn: "2024-04-27",
	checkOut: "2024-04-29",
	discount: 10,
});
const booking2 = new Booking({
	name: "Pepa",
	email: "b@b.com",
	checkIn: "2024-04-22",
	checkOut: "2024-04-26",
	discount: 10,
});

room.setBookings([booking, booking2]);

console.log(room.isOccupied("2024-04-28"));

module.exports = { Room, Booking };
