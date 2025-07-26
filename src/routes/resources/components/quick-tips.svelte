<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import Phone from '@lucide/svelte/icons/phone';
	import Wifi from '@lucide/svelte/icons/wifi';

	import Calendar from '@lucide/svelte/icons/calendar';
</script>

<section class="mt-12">
	<h2 class="mb-6 text-2xl font-semibold">Quick Tips</h2>
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		<Card.Root>
			<Card.Header>
				<Card.Title class="flex items-center gap-2">
					<Phone class="text-primary h-5 w-5" />
					Emergency Numbers
				</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-2">
				<p class="text-sm"><strong>Police:</strong> 112</p>
				<p class="text-sm"><strong>Fire/Ambulance:</strong> 119</p>
				<p class="text-sm"><strong>Tourist Hotline:</strong> 1330</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title class="flex items-center gap-2">
					<Wifi class="text-primary h-5 w-5" />
					Internet & Apps
				</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-2">
				<p class="text-sm"><strong>Free WiFi:</strong> Available in most public areas</p>
				<p class="text-sm">
					<strong>Essential Apps:</strong> KakaoMap, Naver Map, Google Translate
				</p>
				<p class="text-sm"><strong>Payment:</strong> Credit cards widely accepted</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title class="flex items-center gap-2">
					<Calendar class="text-primary h-5 w-5" />
					Best Times to Visit
				</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-2">
				<p class="text-sm"><strong>Spring:</strong> Cherry blossoms (March-April)</p>
				<p class="text-sm"><strong>Fall:</strong> Beautiful autumn colors (October-November)</p>
				<p class="text-sm"><strong>Avoid:</strong> Monsoon season (July-August)</p>
			</Card.Content>
		</Card.Root>
	</div>
</section>
