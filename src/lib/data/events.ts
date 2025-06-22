export interface Event {
	id: number;
	title: string;
	description: string;
	date: Date;
	location: string;
	type: 'public' | 'private';
	category: 'cultural' | 'food' | 'music' | 'sports' | 'technology' | 'social';
	image?: string;
}

export const events: Event[] = [
	{
		id: 1,
		title: 'Cherry Blossom Festival',
		description: 'Experience the beautiful cherry blossoms at Yeouido Spring Flower Festival',
		date: new Date(2024, 3, 15), // April 15, 2024
		location: 'Yeouido Park, Seoul',
		type: 'public',
		category: 'cultural'
	},
	{
		id: 2,
		title: 'Korean BBQ Meetup',
		description: 'Join us for an authentic Korean BBQ experience and meet new people',
		date: new Date(2024, 3, 20), // April 20, 2024
		location: 'Gangnam District, Seoul',
		type: 'private',
		category: 'food'
	},
	{
		id: 3,
		title: 'K-Pop Dance Workshop',
		description: 'Learn the latest K-pop dance moves with professional instructors',
		date: new Date(2024, 3, 25), // April 25, 2024
		location: 'Hongdae, Seoul',
		type: 'public',
		category: 'music'
	},
	{
		id: 4,
		title: 'Busan International Film Festival',
		description: 'Attend Asia\'s most prestigious film festival',
		date: new Date(2024, 9, 5), // October 5, 2024
		location: 'Busan Cinema Center',
		type: 'public',
		category: 'cultural'
	},
	{
		id: 5,
		title: 'Seoul Marathon',
		description: 'Run through the beautiful streets of Seoul in this annual marathon',
		date: new Date(2024, 2, 17), // March 17, 2024
		location: 'Seoul Olympic Stadium',
		type: 'public',
		category: 'sports'
	},
	{
		id: 6,
		title: 'Tech Startup Meetup',
		description: 'Network with Korean tech entrepreneurs and investors',
		date: new Date(2024, 4, 10), // May 10, 2024
		location: 'Gangnam Startup Hub',
		type: 'private',
		category: 'technology'
	},
	{
		id: 7,
		title: 'Traditional Hanbok Experience',
		description: 'Try on traditional Korean hanbok and take photos at Gyeongbokgung',
		date: new Date(2024, 5, 8), // June 8, 2024
		location: 'Gyeongbokgung Palace, Seoul',
		type: 'public',
		category: 'cultural'
	},
	{
		id: 8,
		title: 'Language Exchange Meetup',
		description: 'Practice Korean and English with native speakers',
		date: new Date(2024, 4, 15), // May 15, 2024
		location: 'Itaewon, Seoul',
		type: 'private',
		category: 'social'
	},
	{
		id: 9,
		title: 'Korean Street Food Tour',
		description: 'Explore the best street food in Myeongdong with a local guide',
		date: new Date(2024, 6, 12), // July 12, 2024
		location: 'Myeongdong, Seoul',
		type: 'public',
		category: 'food'
	},
	{
		id: 10,
		title: 'BTS Concert',
		description: 'Experience the biggest K-pop group live in concert',
		date: new Date(2024, 8, 20), // September 20, 2024
		location: 'Olympic Stadium, Seoul',
		type: 'public',
		category: 'music'
	}
]; 