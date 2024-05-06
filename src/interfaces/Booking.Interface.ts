import { RoomProperties } from "./Room.interface";

export interface BookingInterface {
	name: string;
	email: string;
	checkIn: string;
	checkOut: string;
	discount: number;
	room: RoomProperties;
}

export interface totalProps {
	rooms: RoomProperties[];
	startDate: string;
	endDate: string;
}
