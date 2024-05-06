import { BookingInterface } from "./Booking.Interface";

export interface RoomProperties {
	name: string;
	rate: number;
	discount: number;
	bookings?: BookingInterface[];
}
interface RoomMethods {
	setBookings: (bookings: BookingInterface[]) => void;
	isOccupied: (date: string) => boolean | void;
	occupancyPercentage: (startDate: string, endDate: string) => number;
}
export interface RoomInterface extends RoomProperties, RoomMethods {}
