const bookings = [
	{
		checkIn: "2024-04-21",
		checkOut: "2024-04-21",
	},
	{
		checkIn: "2024-04-22",
		checkOut: "2024-04-23",
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
	occupancyPercentage(startDate, endDate) {
		const startDatee = new Date(startDate).getTime();
		const endDatee = new Date(endDate).getTime();

		const totalDays = (endDatee - startDatee) / (1000 * 60 * 60 * 24) + 1;
		let daysOccupied = 0;

		this.bookings.forEach((booking) => {
			const bookingStart = new Date(booking.checkIn).getTime();
			const bookingEnd = new Date(booking.checkOut).getTime();

			// Verificar si alguna parte de la reserva coincide con el período evaluado
			if (startDatee <= bookingEnd && endDatee >= bookingStart) {
				// Calcular la cantidad de días ocupados durante la reserva
				const overlapStart = Math.max(startDatee, bookingStart);
				const overlapEnd = Math.min(endDatee, bookingEnd);
				const overlapDays =
					(overlapEnd - overlapStart) / (1000 * 60 * 60 * 24) + 1;

				// Incrementar los días ocupados
				daysOccupied += overlapDays;
			}
		});
		const occupancyPercentage = (daysOccupied / totalDays) * 100;
		return { occupancyPercentage, daysOccupied, totalDays };
	}
}

const room = new Room({ name: "101", bookings, rate: 100, discount: 10 });

console.log(room.occupancyPercentage("2024-04-21", "2024-04-26"));
