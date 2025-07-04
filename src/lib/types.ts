import type { Time } from "@internationalized/date";

export type Item = AppEvent | AppLocation;

export type AppEvent = {
	id: number;
	name: string;
	description: string;
	date: Date;
	location: string;
	category: string;
	type: string;
	fee: boolean;
	image?: string;
	time?: string;
	capacity?: number;
	organizer?: string;
	contact?: string;
	website?: string;
	price?: string;
	requirements?: string[];
	highlights?: string[];
	longDescription?: string;
}

export type AppLocation = {
	id: number;
	name: string;
	description: string;
	address: string;
	lat: number;
	lng: number;
	image?: string;
	openHour?: Time;
	closeHour?: Time;
	daysOpen?: string | null;
	phone?: string;
	website?: string;
	tags?: string[];
	price?: string;
	bestTime?: string;
	tips?: string[];
}