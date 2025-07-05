import Globe from '@lucide/svelte/icons/globe';
import MapPin from '@lucide/svelte/icons/map-pin';
import BookOpen from '@lucide/svelte/icons/book-open';
import Languages from '@lucide/svelte/icons/languages';
import Train from '@lucide/svelte/icons/train';
import Bus from '@lucide/svelte/icons/bus';
import Plane from '@lucide/svelte/icons/plane';
import Users from '@lucide/svelte/icons/users';
import ShoppingBag from '@lucide/svelte/icons/shopping-bag';
import Calendar from '@lucide/svelte/icons/calendar';
import Camera from '@lucide/svelte/icons/camera';
import Utensils from '@lucide/svelte/icons/utensils';
import Wifi from '@lucide/svelte/icons/wifi';
import CreditCard from '@lucide/svelte/icons/credit-card';

// Icon mapping object
export const iconMap = {
  'Globe': Globe,
  'MapPin': MapPin,
  'BookOpen': BookOpen,
  'Languages': Languages,
  'Train': Train,
  'Bus': Bus,
  'Plane': Plane,
  'Users': Users,
  'ShoppingBag': ShoppingBag,
  'Calendar': Calendar,
  'Camera': Camera,
  'Utensils': Utensils,
  'Wifi': Wifi,
  'CreditCard': CreditCard
} as const;

// Function to get icon component by name
export function getIconComponent(iconName: string) {
  return iconMap[iconName as keyof typeof iconMap] || Globe;
} 