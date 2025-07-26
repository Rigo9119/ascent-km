import { browser } from '$app/environment';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type AuthMode = 'login' | 'signup';

export function transformObjToSelectItemsObj(array: { id: string; name: string }[]) {
	const transformedArr = array.map((item: { id: string; name: string }) => ({
		value: item.id,
		label: item.name
	}));

	return transformedArr;
}

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
		technology: 'bg-fuchsia-100 text-fuchsia-800',
		social: 'bg-pink-100 text-pink-800',
		travel: 'bg-teal-100 text-teal-800',
		education: 'bg-indigo-100 text-indigo-800',
		health: 'bg-emerald-100 text-emerald-800',
		art: 'bg-yellow-100 text-yellow-800'
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

export function getCommunityTypeColor(type: string): string {
	const colors = {
		interest_group: 'bg-blue-100 text-blue-800',
		professional_network: 'bg-fuchsia-100 text-fuchsia-800',
		local_community: 'bg-green-100 text-green-800',
		support_group: 'bg-rose-100 text-rose-800',
		educational: 'bg-indigo-100 text-indigo-800',
		advocacy: 'bg-yellow-100 text-yellow-800',
		social_club: 'bg-pink-100 text-pink-800',
		religious: 'bg-purple-100 text-purple-800',
		sports_fitness: 'bg-orange-100 text-orange-800',
		cultural: 'bg-teal-100 text-teal-800'
	};
	return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
}

export function dataURLtoBlob(dataurl: string) {
	const arr = dataurl.split(',');
	const mime = arr[0].match(/:(.*?);/)?.[1] || '';
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], { type: mime });
}
