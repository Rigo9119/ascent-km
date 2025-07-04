export type AppEvent = {
	id: number;
	title: string;
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
	id: number,
	name: string,
	image: string,
	description: string,
	address: string,
	lat: number,
	lng: number
}