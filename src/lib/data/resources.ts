import type { Resource } from "../types";
import Users from '@lucide/svelte/icons/users';
import Camera from '@lucide/svelte/icons/camera';
import Utensils from '@lucide/svelte/icons/utensils';
import ShoppingBag from '@lucide/svelte/icons/shopping-bag';
import CreditCard from '@lucide/svelte/icons/credit-card';
import Bus from '@lucide/svelte/icons/bus';
import Train from '@lucide/svelte/icons/train';
import Plane from '@lucide/svelte/icons/plane';
import BookOpen from '@lucide/svelte/icons/book-open';
import Globe from '@lucide/svelte/icons/globe';
import Languages from '@lucide/svelte/icons/languages';
import MapPin from '@lucide/svelte/icons/map-pin';
import Calendar from '@lucide/svelte/icons/calendar';
import Wifi from '@lucide/svelte/icons/wifi';

export const resources: Resource[] = [
  // Travel Guides
  {
    title: 'Korea Tourism Organization',
    description: 'Official tourism website with comprehensive travel information, itineraries, and cultural insights.',
    url: 'https://english.visitkorea.or.kr',
    category: 'Travel Guides',
    icon: Globe,
    badge: 'Official'
  },
  {
    title: 'Seoul Metropolitan Government',
    description: 'Official Seoul city website with tourist information, events, and city guides.',
    url: 'https://english.seoul.go.kr',
    category: 'Travel Guides',
    icon: MapPin,
    badge: 'Official'
  },
  {
    title: 'Lonely Planet Korea',
    description: 'Comprehensive travel guide with practical tips, maps, and cultural information.',
    url: 'https://www.lonelyplanet.com/south-korea',
    category: 'Travel Guides',
    icon: BookOpen
  },

  // Language Learning
  {
    title: 'Talk To Me In Korean',
    description: 'Popular Korean language learning platform with free lessons, podcasts, and study materials.',
    url: 'https://talktomeinkorean.com',
    category: 'Language Learning',
    icon: Languages,
    badge: 'Free'
  },
  {
    title: 'Duolingo Korean',
    description: 'Interactive Korean language learning app with gamified lessons and exercises.',
    url: 'https://www.duolingo.com/course/ko/en/Learn-Korean',
    category: 'Language Learning',
    icon: Languages,
    badge: 'Free'
  },
  {
    title: 'KoreanClass101',
    description: 'Comprehensive Korean learning platform with audio lessons, vocabulary, and cultural insights.',
    url: 'https://www.koreanclass101.com',
    category: 'Language Learning',
    icon: Languages
  },

  // Transportation
  {
    title: 'Korea Rail Pass',
    description: 'Information about rail passes for tourists, including KTX and regional train services.',
    url: 'https://www.letskorail.com/ebizbf/EbizBfKrPassAbout.do',
    category: 'Transportation',
    icon: Train,
    badge: 'Official'
  },
  {
    title: 'Seoul Metro',
    description: 'Official Seoul subway information with maps, routes, and real-time updates.',
    url: 'https://www.smrt.co.kr',
    category: 'Transportation',
    icon: Bus,
    badge: 'Official'
  },
  {
    title: 'Incheon Airport',
    description: 'Official website with flight information, transportation options, and airport services.',
    url: 'https://www.airport.kr/sites/ap_en/index.do',
    category: 'Transportation',
    icon: Plane,
    badge: 'Official'
  },

  // Practical Information
  {
    title: 'Korea Immigration Service',
    description: 'Official immigration information for visas, residence permits, and entry requirements.',
    url: 'https://www.immigration.go.kr',
    category: 'Practical Info',
    icon: Users,
    badge: 'Official'
  },
  {
    title: 'Korea Customs Service',
    description: 'Information about customs regulations, duty-free allowances, and import restrictions.',
    url: 'https://www.customs.go.kr',
    category: 'Practical Info',
    icon: ShoppingBag,
    badge: 'Official'
  },
  {
    title: 'Korea Weather Service',
    description: 'Official weather forecasts and climate information for all regions of Korea.',
    url: 'https://www.weather.go.kr',
    category: 'Practical Info',
    icon: Calendar,
    badge: 'Official'
  },

  // Cultural Resources
  {
    title: 'Korea Cultural Heritage Foundation',
    description: 'Information about Korean cultural heritage, traditional arts, and cultural events.',
    url: 'https://www.chf.or.kr',
    category: 'Cultural',
    icon: Camera,
    badge: 'Official'
  },
  {
    title: 'Korean Food Foundation',
    description: 'Comprehensive guide to Korean cuisine, recipes, and food culture.',
    url: 'https://www.hansik.org',
    category: 'Cultural',
    icon: Utensils,
    badge: 'Official'
  },
  {
    title: 'Korea Arts Management Service',
    description: 'Information about Korean arts, performances, and cultural events.',
    url: 'https://www.gokams.or.kr',
    category: 'Cultural',
    icon: Camera,
    badge: 'Official'
  },

  // Technology & Communication
  {
    title: 'Korea Communications Commission',
    description: 'Information about mobile services, internet connectivity, and communication regulations.',
    url: 'https://www.kcc.go.kr',
    category: 'Technology',
    icon: Wifi,
    badge: 'Official'
  },
  {
    title: 'Korea Internet & Security Agency',
    description: 'Cybersecurity information and safe internet usage guidelines.',
    url: 'https://www.kisa.or.kr',
    category: 'Technology',
    icon: Wifi,
    badge: 'Official'
  },

  // Financial & Banking
  {
    title: 'Bank of Korea',
    description: 'Official central bank information, exchange rates, and financial regulations.',
    url: 'https://www.bok.or.kr',
    category: 'Financial',
    icon: CreditCard,
    badge: 'Official'
  },
  {
    title: 'Korea Financial Supervisory Service',
    description: 'Information about banking services, financial regulations, and consumer protection.',
    url: 'https://www.fss.or.kr',
    category: 'Financial',
    icon: CreditCard,
    badge: 'Official'
  }
];