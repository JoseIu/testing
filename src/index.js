const bookings = [
	{
		checkIn: "2024-04-15",
		checkOut: "2024-04-23",
	},
	{
		checkIn: "2024-04-24",
		checkOut: "2024-04-26",
	},
	{
		checkIn: "2024-03-10",
		checkOut: "2024-03-15",
	},
];

class Room {
	constructor({ name, bookings, rate, discount }) {
		this.name = name;
		this.bookings = bookings;
		this.rate = rate;
		this.discount = discount;
	}
	isOccupied(date) {
		const dateToCheck = new Date(date).getTime();
		const isOccupied = this.bookings.some((booking) => {
			const bookingDate = new Date(booking.checkIn).getTime();
			return dateToCheck === bookingDate;
		});

		return isOccupied;
	}
	occupancyPercentage(startDate, endDate) {
		const startDatee = new Date(startDate).getTime();
		const endDatee = new Date(endDate).getTime();

		const totalDays = (endDatee - startDatee) / (1000 * 60 * 60 * 24) + 1;
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

const room = new Room({ name: "101", bookings, rate: 100, discount: 10 });

console.log(room.occupancyPercentage("2024-04-21", "2024-04-23"));

console.log(room.isOccupied("2024-04-24"));

module.exports = Room;
