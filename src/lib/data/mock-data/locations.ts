import type { AppLocation } from '../../types';

export const locations: AppLocation[] = [
	{
		id: 1,
		name: 'Gyeongbokgung Palace',
		description:
			'The main royal palace of the Joseon dynasty, Gyeongbokgung Palace is a stunning example of traditional Korean architecture and a must-visit destination in Seoul. Built in 1395, it served as the main royal palace for over 500 years and features beautiful gardens, pavilions, and the iconic Gwanghwamun Gate.',
		address: '161 Sajik-ro, Jongno-gu, Seoul, South Korea',
		lat: 37.5796,
		lng: 126.977,
		image: 'https://source.unsplash.com/random/1200x600?palace',
		open_hour: 9,
		close_hour: 18,
		days_open: 'Close on Tuesdays',
		phone: '+82-2-3700-3900',
		website: 'https://www.royalpalace.go.kr',
		price: '₩3,000 (Adults)',
		best_time:
			'Spring (March-May) for cherry blossoms, Fall (September-November) for autumn colors',
		tips: [
			'Visit early morning to avoid crowds and see the changing of the guard ceremony',
			'Wear comfortable shoes as the palace grounds are extensive',
			'Rent a hanbok (traditional Korean dress) for free admission and great photos',
			'Combine with a visit to nearby Bukchon Hanok Village'
		]
	},
	{
		id: 2,
		name: 'N Seoul Tower',
		description:
			"A communication and observation tower on Namsan Mountain in central Seoul, offering breathtaking panoramic views of the city. The tower stands 236 meters tall and is one of Seoul's most iconic landmarks, especially beautiful at night when the city lights up.",
		address: '105 Namsangongwon-gil, Yongsan-gu, Seoul, South Korea',
		lat: 37.5512,
		lng: 126.9882,
		image: 'https://source.unsplash.com/random/1200x600?tower',
		open_hour: 9,
		close_hour: 18,
		days_open: null,
		phone: '+82-2-3455-9277',
		website: 'https://www.seoultower.co.kr',
		price: '₩16,000 (Observatory)',
		best_time: 'Sunset or evening for the best city views and romantic atmosphere',
		tips: [
			'Take the cable car up Namsan Mountain for a scenic ride',
			'Visit during sunset for spectacular views of the city',
			'Book a table at the rotating restaurant for a unique dining experience',
			'Bring a camera for amazing photo opportunities'
		]
	},
	{
		id: 3,
		name: 'Bukchon Hanok Village',
		description:
			'A traditional Korean village with a long history located between Gyeongbok Palace, Changdeok Palace and Jongmyo Royal Shrine. This charming neighborhood features hundreds of traditional Korean houses (hanok) and offers visitors a glimpse into traditional Korean life.',
		address: 'Gyedong-gil, Jongno-gu, Seoul, South Korea',
		lat: 37.5828,
		lng: 126.9836,
		image: 'https://source.unsplash.com/random/1200x600?traditional-village',
		open_hour: 6,
		close_hour: 24,
		days_open: null,
		phone: 'N/A',
		website: 'N/A',
		price: 'Free',
		best_time: 'Early morning or late afternoon for fewer crowds and better photos',
		tips: [
			'Be respectful as this is a residential area - keep noise levels down',
			'Visit early morning for the best photos without crowds',
			'Wear comfortable shoes for walking on the hilly streets',
			'Many hanok offer traditional cultural experiences and tea ceremonies'
		]
	},
	{
		id: 4,
		name: 'Myeong-dong',
		description:
			'One of the primary shopping districts in Seoul, Myeong-dong is a vibrant area known for its shopping, street food, and entertainment. This bustling district offers everything from international brands to local Korean cosmetics and street food vendors.',
		address: 'Myeongdong-gil, Jung-gu, Seoul, South Korea',
		lat: 37.5633,
		lng: 126.9842,
		image: 'https://source.unsplash.com/random/1200x600?shopping-district',
		open_hour: 10,
		close_hour: 22,
		days_open: null,
		phone: 'N/A',
		website: 'N/A',
		price: 'Free (Shopping costs vary)',
		best_time: 'Evening (6-10 PM) for the most vibrant atmosphere and street food',
		tips: [
			'Visit in the evening for the best street food experience',
			'Bring cash for street food vendors',
			"Look for tax-free shopping opportunities if you're a tourist",
			'Combine shopping with a visit to nearby Namsan Tower'
		]
	}
];
