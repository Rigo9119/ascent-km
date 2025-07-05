import type { Component } from "svelte";

export type Item = AppEvent | AppLocation | Community;

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
	open_hour?: number;
	close_hour?: number;
	days_open?: string | null;
	phone?: string;
	website?: string;
	tags?: string[];
	price?: string;
	best_time?: string;
	tips?: string[];
}

export type Community = {
	id: number,
	name: string,
	description: string,
	image: string,
	address: string
}

export type Resource = {
	title: string;
	description: string;
	url: string;
	category: string;
	icon: Component;
	badge?: string;
}

