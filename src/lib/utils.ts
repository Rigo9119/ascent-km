import { browser } from '$app/environment';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type AuthMode = 'login' | 'signup';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

export function authMode(mode: AuthMode) {
	mode = mode === 'login' ? 'signup' : 'login';
	if (browser) {
		const url = new URL(window.location.href);
		url.searchParams.set('mode', mode);
		window.history.replaceState({}, '', url.toString());
	}
}

export function getCategoryColor(category: string): string {
	const colors = {
		cultural: 'bg-blue-100 text-blue-800',
		food: 'bg-orange-100 text-orange-800',
		music: 'bg-purple-100 text-purple-800',
		sports: 'bg-green-100 text-green-800',
		technology: 'bg-gray-100 text-gray-800',
		social: 'bg-pink-100 text-pink-800'
	};
	return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
}

export function getTypeColor(type: string): string {
	const colors = {
		public: 'bg-green-100 text-green-800',
		private: 'bg-red-100 text-red-800'
	};
	return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
}

export function getFeeColor(fee: boolean): string {
	return fee ? 'bg-yellow-100 text-yellow-800' : 'bg-emerald-100 text-emerald-800';
}