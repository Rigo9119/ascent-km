<script lang="ts">
	import FormInput from '@/lib/components/forms/components/form-input.svelte';
	import FormSelect from '@/lib/components/forms/components/form-select.svelte';
	import FormMultiSelect from '@/lib/components/forms/components/form-multiselect.svelte';
	import { type HtmlInputEvent } from '@/lib/types';
	import { type AnyFieldApi } from '@tanstack/svelte-form';
	import { Avatar, AvatarImage, AvatarFallback } from '@/lib/components/ui/avatar';
	import { countryCodes } from '@/lib/utils/countryCodesOptions';
	import { countryOptions } from '@/lib/utils/countryOptions';
	import Textarea from '@/lib/components/ui/textarea/textarea.svelte';

	const props = $props();
	const { form } = props;

	const interestOptions = [
		{ value: 'music', label: 'Music' },
		{ value: 'sports', label: 'Sports' },
		{ value: 'travel', label: 'Travel' },
		{ value: 'food', label: 'Food' },
		{ value: 'art', label: 'Art' },
		{ value: 'technology', label: 'Technology' },
		{ value: 'reading', label: 'Reading' },
		{ value: 'gaming', label: 'Gaming' },
		{ value: 'nature', label: 'Nature' }
	];

	const countryCityOptions = [
		{ country: 'South Korea', code: 'KR', cities: ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon'] },
		{ country: 'Japan', code: 'JP', cities: ['Tokyo', 'Osaka', 'Kyoto', 'Nagoya'] },
		{ country: 'USA', code: 'US', cities: ['New York', 'Los Angeles', 'Chicago', 'San Francisco'] },
	];

	const preferenceOptions = [
		{ value: 'email_notifications', label: 'Email Notifications' },
		{ value: 'sms_alerts', label: 'SMS Alerts' },
		{ value: 'newsletter', label: 'Newsletter' },
	];

	const socialTypes = [
		{ type: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/yourprofile' },
		{ type: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/yourprofile' },
		{ type: 'kakao', label: 'Kakao', placeholder: 'https://open.kakao.com/yourprofile' },
	];

	let selectedCountry = $state(form.state.values.location?.country || countryCityOptions[0].code);
	let selectedCity = $state(form.state.values.location?.city || countryCityOptions[0].cities[0]);

	let citiesForSelectedCountry: string[] = $state([]);
	$effect(() => {
		citiesForSelectedCountry = countryCityOptions.find(c => c.code === selectedCountry)?.cities || [];
	});
	$effect(() => {
		if (form && form.fields && form.fields.location) {
			form.fields.location.handleChange({ country: selectedCountry, city: selectedCity });
		}
	});
</script>

<form>
	<form.Field name="username">
		{#snippet children(field: AnyFieldApi)}
			<FormInput
				{field}
				name={field.name}
				label="Username"
				inputId={field.name}
				type="text"
				placeholder="Your username"
				value={field.state.value}
				oninput={(event: HtmlInputEvent) => {
					const target = event.currentTarget as HTMLInputElement;
					field.handleChange(target.value);
				}}
			/>
		{/snippet}
	</form.Field>
	<form.Field name="full_name">
		{#snippet children(field: AnyFieldApi)}
			<FormInput
				{field}
				name={field.name}
				label="Full name"
				inputId={field.name}
				type="text"
				placeholder="Your full name"
				value={field.state.value}
				oninput={(event: HtmlInputEvent) => {
					const target = event.currentTarget as HTMLInputElement;
					field.handleChange(target.value);
				}}
			/>
		{/snippet}
	</form.Field>
	<form.Field name="avatar">
		{#snippet children(field: AnyFieldApi)}
			<div class="flex items-center gap-4">
				<Avatar class="size-16">
					<AvatarImage src={field.state.value} alt="Avatar preview" />
					<AvatarFallback>?</AvatarFallback>
				</Avatar>
				<FormInput
					name="avatar"
					label="Avatar"
					inputId="avatar"
					type="file"
					customClass="block"
					oninput={(e: Event) => {
						const target = e.target as HTMLInputElement;
						const file = target.files?.[0];
						if (file) {
							const reader = new FileReader();
							reader.onload = (ev) => {
								field.handleChange(ev.target?.result as string);
							};
							reader.readAsDataURL(file);
						}
					}}
				/>
			</div>
		{/snippet}
	</form.Field>
	<form.Field name="phone">
		{#snippet children(field: AnyFieldApi)}
			<div class="flex flex-row items-center justify-between gap-2">
				<FormSelect
					forLabel="country-code"
					label="Code"
					name="country-code"
					bind:value={field.state.value}
					selectId="country-code"
					placeholder="Code"
					options={countryCodes}
				/>
				<FormInput
					name="phone-number"
					label="Phone"
					inputId="phone-number"
					type="tel"
					placeholder="Phone number"
					value={field.state.value?.number || ''}
					oninput={(e: Event) => {
						const target = e.target as HTMLInputElement;
						field.handleChange({ ...(field.state.value || {}), number: target.value });
					}}
					customClass="flex-1"
				/>
			</div>
		{/snippet}
	</form.Field>
	<form.Field name="email">
		{#snippet children(field: AnyFieldApi)}
			<FormInput
				{field}
				required
				name={field.name}
				label="Email"
				inputId={field.name}
				type="email"
				autocomplete="email"
				placeholder="example@email.com"
				value={field.state.value}
				oninput={(event: HtmlInputEvent) => {
					const target = event.currentTarget as HTMLInputElement;
					field?.handleChange(target.value);
				}}
			/>
		{/snippet}
	</form.Field>
	<form.Field name="country">
		{#snippet children(field: AnyFieldApi)}
			<FormSelect
				forLabel="country"
				label="Country of Birth"
				name="country"
				bind:value={field.state.value}
				selectId="country"
				placeholder="Select your country"
				options={countryOptions}
			/>
		{/snippet}
	</form.Field>
	<form.Field name="interest">
		{#snippet children(field: AnyFieldApi)}
			<FormMultiSelect
				label="Interests"
				name={field.name}
				value={field.state.value || []}
				options={interestOptions}
				onChange={(selected) => field.handleChange(selected)}
			/>
		{/snippet}
	</form.Field>
	<form.Field name="bio">
		{#snippet children(field: AnyFieldApi)}
			<label for={field.name} class="block text-sm font-medium text-gray-700 mb-1">Bio</label>
			<Textarea
				id={field.name}
				name={field.name}
				placeholder="Tell us about yourself..."
				bind:value={field.state.value}
				rows={4}
				maxlength={280}
				class="resize-none"
			/>
			<div class="text-xs text-gray-500 text-right mt-1">{field.state.value?.length || 0}/280</div>
		{/snippet}
	</form.Field>
	<form.Field name="location">
		{#snippet children(field: AnyFieldApi)}
			<div class="flex gap-2">
				<FormSelect
					forLabel="country-select"
					label="Country"
					name="country"
					selectId="country-select"
					placeholder="Select country"
					options={countryCityOptions.map(c => ({ value: c.code, label: c.country }))}
					bind:value={selectedCountry}
				/>
				<FormSelect
					forLabel="city-select"
					label="City"
					name="city"
					selectId="city-select"
					placeholder="Select city"
					options={citiesForSelectedCountry.map((city: string) => ({ value: city, label: city }))}
					bind:value={selectedCity}
				/>
			</div>
		{/snippet}
	</form.Field>

	<form.Field name="social_links">
		{#snippet children(field: AnyFieldApi)}
			<div class="space-y-2">
				{#each socialTypes as social, i}
					<FormInput
						name={social.type}
						label={social.label}
						inputId={social.type}
						type="text"
						placeholder={social.placeholder}
						value={field.state.value?.[i]?.url || ''}
						oninput={(e: Event) => {
							const target = e.target as HTMLInputElement;
							const url = target.value;
							let links = Array.isArray(field.state.value) ? [...field.state.value] : [];
							links[i] = { type: social.type, url };
							field.handleChange(links);
						}}
					/>
				{/each}
			</div>
		{/snippet}
	</form.Field>

	<form.Field name="preferences">
		{#snippet children(field: AnyFieldApi)}
			<div class="flex flex-col gap-2">
				{#each preferenceOptions as pref}
					<label class="flex items-center gap-2">
						<input
							type="checkbox"
							checked={Array.isArray(field.state.value) && field.state.value.includes(pref.value)}
							onchange={() => {
								let prefs = Array.isArray(field.state.value) ? [...field.state.value] : [];
								if (prefs.includes(pref.value)) {
									prefs = prefs.filter(v => v !== pref.value);
								} else {
									prefs.push(pref.value);
								}
								field.handleChange(prefs);
							}}
						/>
						<span>{pref.label}</span>
					</label>
				{/each}
			</div>
		{/snippet}
	</form.Field>
</form>
