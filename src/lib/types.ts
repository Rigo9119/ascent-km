import type { Component } from "svelte";

export type Item = AppEvent | AppLocation | Community;

export type AppEvent = {
	id: number;
	name: string;
	description: string;
	date: string; // ISO date string from database
	location_id: number;
	category_id: number;
	event_type_id: number;
	is_free: boolean;
	image?: string;
	time?: string;
	capacity?: number;
	organizer?: string;
	contact?: string;
	website?: string;
	price?: string;
	requirements?: string[];
	highlights?: string[];
	long_description?: string;
	created_at?: string;
	updated_at?: string;
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
	rating?: number;
	review_count?: number;
	is_featured?: boolean;
	created_at?: string;
	updated_at?: string;
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

