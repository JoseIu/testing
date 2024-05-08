import { RoomInterface, RoomProperties } from "./Room.interface";

export interface BookingInterface {
	name: string;
	email: string;
	checkIn: string;
	checkOut: string;
	discount: number;
	room: RoomProperties;
}

export interface totalProps {
	rooms: RoomInterface[];
	startDate: string;
	endDate: string;
}
