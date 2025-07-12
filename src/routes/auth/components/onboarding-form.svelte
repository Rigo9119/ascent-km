<script lang="ts">
	import FormInput from '@/lib/components/forms/components/form-input.svelte';
	import FormSelect from '@/lib/components/forms/components/form-select.svelte';
	import FormMultiSelect from '@/lib/components/forms/components/form-multiselect.svelte';
	import { type HtmlInputEvent } from '@/lib/types';
	import { Field, type AnyFieldApi, type AnyFormState } from '@tanstack/svelte-form';
	import { Avatar, AvatarImage, AvatarFallback } from '@/lib/components/ui/avatar';
	import { countryCodes } from '@/lib/utils/countryCodesOptions';
	import Textarea from '@/lib/components/ui/textarea/textarea.svelte';
	import { Checkbox } from '@/lib/components/ui/checkbox';
	import Button from '@/lib/components/ui/button/button.svelte';
	import Label from '@/lib/components/ui/label/label.svelte';
	import LocationSearch from '@/lib/components/forms/components/location-search.svelte';
	import { type FormEventHandler } from 'svelte/elements';
	import FormTextarea from '@/lib/components/forms/components/form-textarea.svelte';
	import FormCheckboxes from '@/lib/components/forms/components/form-checkboxes.svelte';

	const { form, countryOptions, selectedCountry = $bindable() } = $props();

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
		{
			country: 'South Korea',
			code: 'KR',
			cities: ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon']
		},
		{ country: 'Japan', code: 'JP', cities: ['Tokyo', 'Osaka', 'Kyoto', 'Nagoya'] },
		{ country: 'USA', code: 'US', cities: ['New York', 'Los Angeles', 'Chicago', 'San Francisco'] }
	];
	// TODO: the preferences have to come from supabase
	const preferenceOptions = [
		{ value: 'email_notifications', label: 'Email Notifications' },
		{ value: 'sms_alerts', label: 'SMS Alerts' },
		{ value: 'newsletter', label: 'Newsletter' }
	];

	const socialTypes = [
		{ type: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/yourprofile' },
		{ type: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/yourprofile' },
		{ type: 'kakao', label: 'Kakao', placeholder: 'https://open.kakao.com/yourprofile' }
	];

	let selectedCountryCode = $state(
		form.state.values.location?.country || countryCityOptions[0].code
	);
	let selectedCity = $state(form.state.values.location?.city || countryCityOptions[0].cities[0]);

	let citiesForSelectedCountry: string[] = $derived([]);
	$effect(() => {
		citiesForSelectedCountry =
			countryCityOptions.find((c) => c.code === selectedCountryCode)?.cities || [];
	});
	$effect(() => {
		if (form && form.fields && form.fields.location) {
			form.fields.location.handleChange({ country: selectedCountryCode, city: selectedCity });
		}
	});

	$inspect(() => {
		console.log('Form state updated:', form.state.values);
	});

	function handleCheckboxChange(field: AnyFieldApi, optionValue: string, checked: boolean) {
		let prefs = Array.isArray(field.state.value) ? [...field.state.value] : [];
		if (checked) {
			if (!prefs.includes(optionValue)) prefs.push(optionValue);
		} else {
			prefs = prefs.filter((v) => v !== optionValue);
		}
		field.handleChange(prefs);
		console.log('Checkbox changed:', { optionValue, checked, newPrefs: prefs, fieldName: field.name });
	}
</script>

<form
	class="flex flex-col items-center justify-between gap-4"
	onsubmit={(event) => {
		event.preventDefault();
		event.stopPropagation();
		form.handleSubmit();
	}}
>
	<form.Field name="avatar">
		{#snippet children(field: AnyFieldApi)}
			<div class="flex w-full items-center gap-4">
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

	<form.Field name="username">
		{#snippet children(field: AnyFieldApi)}
			<FormInput
				{field}
				name={field.name}
				label="Username"
				inputId={field.name}
				type="text"
				placeholder="Your username"
				value={selectedCountry}
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
	<div class="flex w-full flex-row items-center justify-between gap-2">
		<form.Field name="country_code">
			{#snippet children(field: AnyFieldApi)}
				<FormSelect
					forLabel="country-code"
					label="Code"
					name="country-code"
					value={field.state.value}
					selectId="country-code"
					placeholder="Code"
					options={countryCodes}
					onValueChange={(value) => {
						field.handleChange(value);
					}}
				/>
			{/snippet}
		</form.Field>
		<form.Field name="phone_number">
			{#snippet children(field: AnyFieldApi)}
				<FormInput
					name="phone-number"
					label="Phone"
					inputId="phone-number"
					type="tel"
					placeholder="Phone number"
					value={field.state.value}
					oninput={(e: Event) => {
						const target = e.target as HTMLInputElement;
						field.handleChange(target.value);
					}}
					customClass="flex-1"
				/>
			{/snippet}
		</form.Field>
	</div>
	<form.Field name="country">
		{#snippet children(field: AnyFieldApi)}
			<FormSelect
				forLabel="country"
				label="Country of Birth"
				name={field.name}
				bind:value={field.state.value}
				selectId={field.name}
				placeholder="Select your country ..."
				options={countryOptions}
				customClass="w-full"
				onValueChange={(value) => {
					field.handleChange(value);
				}}
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
			<FormTextarea
				id={field.name}
				forLabel={field.name}
				label="Bio"
				name={field.name}
				placeholder="Tell us about yourself ..."
				value={field.state.value}
				oninput={(event: Event) => {
					field.handleChange((event.target as HTMLInputElement).value);
				}}
				onblur={() => field.handleBlur()}
				rows={4}
				maxlength={280}
			/>
		{/snippet}
	</form.Field>
	<form.Field name="location">
		{#snippet children(field: AnyFieldApi)}
			<LocationSearch
				value={field.state.value}
				placeholder="Search for your city..."
				on:change={(e) => field.handleChange(e.detail)}
			/>
		{/snippet}
	</form.Field>

	<form.Field name="social_links">
		{#snippet children(field: AnyFieldApi)}
			<div class="w-full space-y-2">
				{#each socialTypes as social, i (social.type)}
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
			<FormCheckboxes
				{field}
				label="Preferences"
				forLabel={field.name}
				wrapperClass="flex flex-col gap-2"
				options={preferenceOptions}
				onChange={(optionValue, checked) => handleCheckboxChange(field, optionValue, checked)}
			/>
		{/snippet}
	</form.Field>
	<form.Subscribe
		selector={(state: AnyFormState) => ({
			canSubmit: state.canSubmit,
			isSubmitting: state.isSubmitting
		})}
	>
		{#snippet children({ canSubmit, isSubmitting }: { canSubmit: boolean; isSubmitting: boolean })}
			<Button
				type="submit"
				class="mt-6 w-full cursor-pointer bg-rose-500 hover:bg-rose-600"
				disabled={!canSubmit || isSubmitting}
			>
				{isSubmitting ? 'Submitting...' : 'Complete your profile'}
			</Button>
		{/snippet}
	</form.Subscribe>
</form>
