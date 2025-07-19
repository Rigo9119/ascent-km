import type { Component } from "svelte";

export type Item = AppEvent | AppLocation | Community;
export type HtmlInputEvent = Event & {
	currentTarget: EventTarget & HTMLInputElement;
}

export type AppEvent = {
	id: string; // UUID
	name: string;
	description: string;
	date: string; // ISO date string from database
	location_id: string; // UUID
	category_id: string; // UUID
	event_type_id: string; // UUID
	is_free: boolean;
	image_url?: string;
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
	id: string; // UUID
	name: string;
	description: string;
	address: string;
	lat: number;
	lng: number;
	image_url?: string;
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
  id: string; // UUID
  name: string;
  description: string;
	long_description: string;
  image: string;
  member_count: number;
  is_public: boolean;
  is_featured: boolean;
  tags: string[];
  rules: string[];
  contact_email: string;
  website: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  image_url: string;
  image_path: string;
  location: string;
  category: string;
  meeting_frequency: string;
  recent_discussions:  Discussion[]; // JSONB type
  upcoming_events: Event[]; // JSONB type
	organizer_id: string; // UUID reference to profiles
	next_meeting_date: string; // ISO date string
	next_meeting_location: string; 
	next_meeting_details: string
}

export type Discussion = {
  id: string;
  title: string;
  created_at: string;
	author: string;
	date: string;
	replies: string[]
  // other discussion properties
}

export type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
	description: string
  // other event properties
}

export type CommunityMember = {
	id: number;
	community_id: number;
	user_id: string; // UUID
	role: 'admin' | 'moderator' | 'member';
	joined_at: string;
}

export type Resource = {
	title: string;
	description: string;
	url: string;
	category: string;
	icon: Component;
	badge?: string;
}

export type Category = {
	id: string; // UUID
	name: string;
	description?: string;
	created_at?: string;
	updated_at?: string;
}

export type EventType = {
	id: string; // UUID
	name: string;
	description?: string;
	created_at?: string;
	updated_at?: string;
}

// User Profile Types
export interface UserProfile {
	id: string; // UUID (same as auth.users.id)
	username?: string;
	display_name?: string;
	bio?: string;
	avatar_url?: string;
	location?: string;
	website?: string;
	social_links?: Record<string, string>;
	preferences?: Record<string, unknown>;
	is_public: boolean;
	created_at: string;
	updated_at: string;
}

// Favorite Types
export interface UserFavoriteEvent {
	id: string; // UUID
	user_id: string; // UUID
	event_id: string; // UUID
	created_at: string;
	// Joined data
	event?: AppEvent;
}

export interface UserFavoriteLocation {
	id: string; // UUID
	user_id: string; // UUID
	location_id: string; // UUID
	created_at: string;
	// Joined data
	location?: AppLocation;
}

export interface UserFavoriteCommunity {
	id: string; // UUID
	user_id: string; // UUID
	community_id: string; // UUID
	created_at: string;
	// Joined data
	community?: Community;
}

// Favorite with joined data
export interface FavoriteEventWithData {
	event_id: string; // UUID
	event_name: string;
	event_description: string;
	event_date: string;
	favorited_at: string;
}

export interface FavoriteLocationWithData {
	location_id: string; // UUID
	location_name: string;
	location_description: string;
	location_address: string;
	location_rating: number;
	favorited_at: string;
}

export interface FavoriteCommunityWithData {
	community_id: string; // UUID
	community_name: string;
	community_description: string;
	community_member_count: number;
	favorited_at: string;
}

// API Response Types
export interface FavoritesResponse {
	events: FavoriteEventWithData[];
	locations: FavoriteLocationWithData[];
	communities: FavoriteCommunityWithData[];
}

export interface ToggleFavoriteResponse {
	success: boolean;
	is_favorited: boolean;
	message?: string;
}

// Event with joined data from related tables
export interface AppEventWithJoinedData extends AppEvent {
	attendees_count: number;
	category_name: string;
	event_type_name: string;
	location_name: string;
	image_path: string;
	image_url: string;
	is_featured: boolean;
	rating: number;
}

