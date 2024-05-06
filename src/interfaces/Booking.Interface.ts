import { RoomInterface } from "./Room.interface";

export interface BookingInterface {
	name: string;
	email: string;
	checkIn: string;
	checkOut: string;
	discount: number;
	room: RoomInterface;
}

export interface totalProps {
	rooms: RoomInterface[];
	startDate: string;
	endDate: string;
}
