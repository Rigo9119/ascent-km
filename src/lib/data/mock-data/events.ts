import type { AppEvent } from "../../types";

export const events: AppEvent[] = [
	{
		id: 1,
		name: 'Seoul Lantern Festival',
		description: 'A festival of lights on the Cheonggyecheon Stream.',
		date: new Date(2024, 10, 1), // November 1, 2024
		location: 'Cheonggyecheon Stream, Seoul',
		category: 'cultural',
		type: 'public',
		fee: false
	},
	{
		id: 2,
		name: 'Korean BBQ Meetup',
		description: 'Join us for an authentic Korean BBQ experience and meet new people',
		date: new Date(2024, 3, 20), // April 20, 2024
		location: 'Gangnam District, Seoul',
		type: 'private',
		category: 'food',
		fee: true
	},
	{
		id: 3,
		name: 'K-Pop Dance Workshop',
		description: 'Learn the latest K-pop dance moves with professional instructors',
		date: new Date(2024, 3, 25), // April 25, 2024
		location: 'Hongdae, Seoul',
		type: 'public',
		category: 'music',
		fee: true
	},
	{
		id: 4,
		name: 'Busan International Film Festival',
		description: 'Attend Asia\'s most prestigious film festival',
		date: new Date(2024, 9, 5), // October 5, 2024
		location: 'Busan Cinema Center',
		type: 'public',
		category: 'cultural',
		fee: true
	},
	{
		id: 5,
		name: 'Seoul Marathon',
		description: 'Run through the beautiful streets of Seoul in this annual marathon',
		date: new Date(2024, 2, 17), // March 17, 2024
		location: 'Seoul Olympic Stadium',
		type: 'public',
		category: 'sports',
		fee: true
	},
	{
		id: 6,
		name: 'Tech Startup Meetup',
		description: 'Network with Korean tech entrepreneurs and investors',
		date: new Date(2024, 4, 10), // May 10, 2024
		location: 'Gangnam Startup Hub',
		type: 'private',
		category: 'technology',
		fee: false
	},
	{
		id: 7,
		name: 'Traditional Hanbok Experience',
		description: 'Try on traditional Korean hanbok and take photos at Gyeongbokgung',
		date: new Date(2024, 5, 8), // June 8, 2024
		location: 'Gyeongbokgung Palace, Seoul',
		type: 'public',
		category: 'cultural',
		fee: true
	},
	{
		id: 8,
		name: 'Language Exchange Meetup',
		description: 'Practice Korean and English with native speakers',
		date: new Date(2024, 4, 15), // May 15, 2024
		location: 'Itaewon, Seoul',
		type: 'private',
		category: 'social',
		fee: false
	},
	{
		id: 9,
		name: 'Korean Street Food Tour',
		description: 'Explore the best street food in Myeongdong with a local guide',
		date: new Date(2024, 6, 12), // July 12, 2024
		location: 'Myeongdong, Seoul',
		type: 'public',
		category: 'food',
		fee: true
	},
	{
		id: 10,
		name: 'BTS Concert',
		description: 'Experience the biggest K-pop group live in concert',
		date: new Date(2024, 8, 20), // September 20, 2024
		location: 'Olympic Stadium, Seoul',
		type: 'public',
		category: 'music',
		fee: true
	},
	{
		id: 11,
		name: 'Christmas Market',
		description: 'Celebrate Christmas with a festive market in Myeong-dong',
		date: new Date(2024, 11, 25), // December 25, 2024
		location: 'Myeong-dong, Seoul',
		category: 'social',
		type: 'public',
		fee: false
	}
] as const; 

export const enhancedEvents: AppEvent[] = [
	{
		id: 1,
		name: 'Seoul Lantern Festival',
		description: 'A festival of lights on the Cheonggyecheon Stream.',
		date: new Date(2024, 10, 1), // November 1, 2024
		location: 'Cheonggyecheon Stream, Seoul',
		category: 'cultural',
		type: 'public',
		fee: false,
		image: 'https://source.unsplash.com/random/1200x600?lantern-festival',
		time: '6:00 PM - 10:00 PM',
		capacity: 5000,
		organizer: 'Seoul Metropolitan Government',
		contact: '+82-2-120',
		website: 'https://www.seoul.go.kr',
		price: 'Free',
		requirements: ['No registration required', 'All ages welcome', 'Bring your own camera'],
		highlights: [
			'Thousands of beautiful lanterns lighting up the stream',
			'Traditional Korean lantern making workshops',
			'Cultural performances and music',
			'Food stalls with local Korean cuisine',
			'Photo opportunities with illuminated landmarks'
		],
		longDescription:
			"The Seoul Lantern Festival is one of the most magical events in Korea, transforming the Cheonggyecheon Stream into a breathtaking display of light and color. This annual festival celebrates Korean culture and tradition through the art of lantern making, featuring thousands of handcrafted lanterns that tell stories of Korea's rich heritage. Visitors can enjoy traditional performances, participate in lantern-making workshops, and savor delicious Korean street food while taking in the spectacular light displays."
	},
	{
		id: 2,
		name: 'Korean BBQ Meetup',
		description: 'Join us for an authentic Korean BBQ experience and meet new people',
		date: new Date(2024, 3, 20), // April 20, 2024
		location: 'Gangnam District, Seoul',
		type: 'private',
		category: 'food',
		fee: true,
		image: 'https://source.unsplash.com/random/1200x600?korean-bbq',
		time: '7:00 PM - 10:00 PM',
		capacity: 20,
		organizer: 'Seoul Foodies Group',
		contact: 'seoulfoodies@email.com',
		website: 'https://www.seoulfoodies.com',
		price: '₩35,000 per person',
		requirements: ['Pre-registration required', 'Ages 18+', 'Dietary restrictions accommodated'],
		highlights: [
			'All-you-can-eat Korean BBQ experience',
			'Learn proper grilling techniques from locals',
			'Meet fellow food enthusiasts and travelers',
			'Includes side dishes and beverages',
			'Vegetarian options available'
		],
		longDescription:
			"Experience the authentic taste of Korea at our exclusive BBQ meetup! This intimate gathering brings together food lovers from around the world to share in the traditional Korean BBQ experience. You'll learn the proper techniques for grilling various cuts of meat, discover the art of wrapping meat in fresh lettuce with garlic and ssamjang, and enjoy a variety of banchan (side dishes) that complement the meal perfectly. This is not just a dining experience - it's a cultural exchange where you'll make new friends while learning about Korean food culture."
	},
	{
		id: 3,
		name: 'K-Pop Dance Workshop',
		description: 'Learn the latest K-pop dance moves with professional instructors',
		date: new Date(2024, 3, 25), // April 25, 2024
		location: 'Hongdae, Seoul',
		type: 'public',
		category: 'music',
		fee: true,
		image: 'https://source.unsplash.com/random/1200x600?dance-workshop',
		time: '2:00 PM - 5:00 PM',
		capacity: 30,
		organizer: 'Hongdae Dance Academy',
		contact: '+82-2-1234-5678',
		website: 'https://www.hongdaedance.com',
		price: '₩50,000 per person',
		requirements: ['Pre-registration required', 'Comfortable dance clothes', 'Water bottle'],
		highlights: [
			'Learn choreography from the latest K-pop hits',
			'Professional dance instructors with industry experience',
			'Video recording of your performance',
			'Certificate of participation',
			'Networking with fellow K-pop enthusiasts'
		],
		longDescription:
			"Step into the world of K-pop with our intensive dance workshop! Whether you're a complete beginner or an experienced dancer, our professional instructors will guide you through the latest choreography from popular K-pop groups. The workshop includes warm-up exercises, step-by-step instruction, and plenty of practice time to perfect your moves. You'll also learn about the history and evolution of K-pop dance styles, and get insider tips on how to improve your performance skills."
	},
	{
		id: 4,
		name: 'Busan International Film Festival',
		description: "Attend Asia's most prestigious film festival",
		date: new Date(2024, 9, 5), // October 5, 2024
		location: 'Busan Cinema Center',
		type: 'public',
		category: 'cultural',
		fee: true,
		image: 'https://source.unsplash.com/random/1200x600?film-festival',
		time: '10:00 AM - 11:00 PM (Daily)',
		capacity: 1000,
		organizer: 'Busan International Film Festival Committee',
		contact: '+82-51-780-6000',
		website: 'https://www.biff.kr',
		price: '₩15,000 - ₩25,000 per screening',
		requirements: [
			'Advance ticket purchase recommended',
			'Valid ID required',
			'Dress code: Smart casual'
		],
		highlights: [
			'World premieres of Asian cinema',
			'Meet and greet sessions with directors',
			'Panel discussions and workshops',
			'Red carpet events and galas',
			'International film market'
		],
		longDescription:
			"The Busan International Film Festival (BIFF) is Asia's most prestigious film festival, showcasing the best of Asian cinema and providing a platform for emerging filmmakers. The festival features world premieres, retrospectives, and special screenings, along with industry networking events and educational programs. Visitors can attend film screenings, participate in Q&A sessions with directors, and explore the beautiful coastal city of Busan while experiencing the vibrant atmosphere of this world-class cultural event."
	},
	{
		id: 5,
		name: 'Seoul Marathon',
		description: 'Run through the beautiful streets of Seoul in this annual marathon',
		date: new Date(2024, 2, 17), // March 17, 2024
		location: 'Seoul Olympic Stadium',
		type: 'public',
		category: 'sports',
		fee: true,
		image: 'https://source.unsplash.com/random/1200x600?marathon',
		time: '8:00 AM - 2:00 PM',
		capacity: 25000,
		organizer: 'Seoul Sports Council',
		contact: '+82-2-2345-6789',
		website: 'https://www.seoulmarathon.kr',
		price: '₩80,000 (Full), ₩60,000 (Half), ₩40,000 (10K)',
		requirements: [
			'Medical certificate required',
			'Age 18+ for full marathon',
			'Proper running gear'
		],
		highlights: [
			"Scenic route through Seoul's landmarks",
			'Professional timing and certification',
			'Medal and finisher certificate',
			'Post-race celebration and refreshments',
			'International runner support'
		],
		longDescription:
			"Experience the thrill of running through one of Asia's most beautiful cities! The Seoul Marathon takes participants on a scenic journey through the heart of Seoul, passing by iconic landmarks such as Gyeongbokgung Palace, N Seoul Tower, and the Han River. The race offers multiple distance options to accommodate runners of all levels, from beginners to elite athletes. The event includes comprehensive support services, including aid stations, medical support, and enthusiastic crowds cheering you on throughout the course."
	}
];