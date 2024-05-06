import { BookingInterface, totalProps } from "./interfaces/Booking.Interface";
import { RoomInterface, RoomProperties } from "./interfaces/Room.interface";
const TIME = require("./constants/time");

export class Room implements RoomInterface {
	name: string;
	bookings?: BookingInterface[];
	rate: number;
	discount: number;
	constructor({ name, rate, bookings = [], discount }: RoomProperties) {
		this.name = name;
		this.bookings = bookings;
		this.rate = rate;
		this.discount = discount;
	}
	setBookings(bookings: BookingInterface[]) {
		bookings.forEach((booking) => {
			this.bookings?.push(booking);
		});
	}
	isOccupied(date: string): boolean | void {
		if (!date) return;
		const dateToCheck = new Date(date).getTime();
		if (!this.bookings) return console.log("No bookings");
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
	occupancyPercentage(startDate: string, endDate: string) {
		const startDatee = new Date(startDate).getTime();
		const endDatee = new Date(endDate).getTime();

		const totalDays =
			(endDatee - startDatee) /
				(TIME.SECOND * TIME.MINUTE * TIME.HOUR * TIME.DAY) +
			1;
		let daysOccupied = 0;

		this.bookings?.forEach((booking) => {
			const bookingStart = new Date(booking.checkIn).getTime();
			const bookingEnd = new Date(booking.checkOut).getTime();

			if (startDatee < bookingEnd && endDatee >= bookingStart) {
				// const overlapStart = Math.max(startDatee, bookingStart);

				// const overlapEnd = Math.min(endDatee, bookingEnd);

				// const overlapDays =
				// 	(overlapEnd - overlapStart) /
				// 		(TIME.SECOND * TIME.MINUTE * TIME.HOUR * TIME.DAY) +
				// 	1;

				// daysOccupied += overlapDays;
				if (this.isOccupied(startDate)) {
					daysOccupied++;
				}
			}
		});
		const totalOcupancy = (daysOccupied / totalDays) * 100;
		return Math.ceil(totalOcupancy);
	}
	static totalOccupancyPercentage({ rooms, startDate, endDate }: totalProps) {
		const TOTAL_ROOMS = rooms.length; //100%

		let percetageAcc = 0;
		rooms.forEach((room) => {
			percetageAcc += room.occupancyPercentage(startDate, endDate);
		});

		return Math.ceil(percetageAcc / TOTAL_ROOMS);
	}
	static availableRooms({ rooms, startDate, endDate }: totalProps) {
		const startDatee = new Date(startDate).getTime();
		const endDatee = new Date(endDate).getTime();

		// const roomsNotOcupied = rooms.filter((room) => {
		// 	const roomStartDate = new Date(room.checkInDate).getTime();
		// 	const roomsEndDate = new Date(room.checkOutDate).getTime();

		// 	if (startDatee < roomsEndDate && endDatee >= roomStartDate) {
		// 		return;
		// 	}
		// 	return room;
		// });

		// return roomsNotOcupied;
	}
}

export class Booking {
	name: string;
	email: string;
	checkIn: string;
	checkOut: string;
	discount: number;
	room: RoomInterface;
	constructor({
		name,
		email,
		checkIn,
		checkOut,
		discount,
		room,
	}: BookingInterface) {
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
	room: room1 as RoomInterface,
});
const booking2 = new Booking({
	name: "Pepa",
	email: "b@b.com",
	checkIn: "2024-04-22",
	checkOut: "2024-04-26",
	discount: 10,
	room: room2 as RoomInterface,
});
room1.setBookings([booking1, booking2]);
console.log(room1.bookings);
