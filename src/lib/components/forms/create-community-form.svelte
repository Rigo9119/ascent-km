<script lang="ts">
	import FormArrayInput from '@/lib/components/forms/components/form-array-input.svelte';
	import FormInput from '@/lib/components/forms/components/form-input.svelte';
	import FormMultiSelect from '@/lib/components/forms/components/form-multiselect.svelte';
	import FormSelect from '@/lib/components/forms/components/form-select.svelte';
	import FormTextarea from '@/lib/components/forms/components/form-textarea.svelte';
	import LocationSearch from '@/lib/components/forms/components/location-search.svelte';
	import { Button } from '@/lib/components/ui/button';
	import Label from '@/lib/components/ui/label/label.svelte';
	import { type HtmlInputEvent } from '@/lib/types';
	import { createForm, type AnyFieldApi, type AnyFormState } from '@tanstack/svelte-form';
	import { Switch } from 'bits-ui';
	import { DateField } from 'bits-ui';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import type { User } from '@supabase/supabase-js';

	interface CreateCommunityFormProps {
		categoriesOptions?: { value: string; label: string }[];
		meetingFrequencyOptions?: { value: string; label: string }[];
		communityTypeOptions?: { value: string; label: string }[];
		user: User;
	}

	const { categoriesOptions = [], meetingFrequencyOptions = [], communityTypeOptions = [], user }: CreateCommunityFormProps = $props();

	// TODO: image, image_url, image_path are the same columns, have to delete tow
	// from supabase

	const createCommunityForm = createForm(() => ({
		defaultValues: {
			name: '',
			description: '',
			image: '',
			member_count: 1,
			is_public: true,
			is_featured: false,
			tags: [],
			rules: [],
			contact_email: user.email || '',
			website: '',
			image_url: '',
			image_path: '',
			location: '',
			category: [],
			meeting_frequency: '',
			recent_discussions: [],
			upcoming_events: [],
			long_description: '',
			contact_phone: '',
			next_meeting_date: '',
			next_meeting_location: '',
			next_meeting_details: '',
			category_id: '',
			community_type_id: ''
		},
		onSubmit: async ({ value }) => {
			try {
				const response = await fetch('/api/communities', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(value)
				});

				const result = await response.json();

				if (response.ok && result.success) {
					toast.success('Community created successfully!', {
						description: `${value.name} has been created and is ready for members.`
					});
					
					// Navigate to the new community page
					setTimeout(() => {
						goto(`/communities/${result.community.id}`);
					}, 1000);
				} else {
					toast.error('Failed to create community', {
						description: result.error || 'Something went wrong. Please try again.'
					});
				}
			} catch (error) {
				console.error('Error creating community:', error);
				toast.error('Network error', {
					description: 'Unable to create community. Please check your connection and try again.'
				});
			}
		}
	}));
</script>

<form
	class="overflow-y-auto p-4"
	onsubmit={(e) => {
		e.preventDefault();
		e.stopPropagation();
		createCommunityForm.handleSubmit();
	}}
>
	<createCommunityForm.Field name={'name'}>
		{#snippet children(field: AnyFieldApi)}
			<FormInput
				{field}
				name={field.name}
				label="Community name"
				inputId={field.name}
				type="text"
				placeholder="Enter community name"
				value={field.state.value}
				oninput={(event: HtmlInputEvent) => {
					const target = event.currentTarget as HTMLInputElement;
					field.handleChange(target.value);
				}}
			/>
		{/snippet}
	</createCommunityForm.Field>
	<createCommunityForm.Field name={'description'}>
		{#snippet children(field: AnyFieldApi)}
			<FormInput
				{field}
				name={field.name}
				label="Short description"
				inputId={field.name}
				type="text"
				placeholder="Short description"
				value={field.state.value}
				oninput={(event: HtmlInputEvent) => {
					const target = event.currentTarget as HTMLInputElement;
					field.handleChange(target.value);
				}}
			/>
		{/snippet}
	</createCommunityForm.Field>
	<createCommunityForm.Field name={'image'}>
		{#snippet children(field: AnyFieldApi)}
			<FormInput
				name={field.name}
				label="Avatar"
				inputId={field.name}
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
		{/snippet}
	</createCommunityForm.Field>
	<createCommunityForm.Field name={'member_count'}>
		{#snippet children(field: AnyFieldApi)}
			<FormInput
				{field}
				name={field.name}
				label="Initial member count"
				inputId={field.name}
				type="number"
				placeholder="Number of initial members"
				value={field.state.value}
				oninput={(event: HtmlInputEvent) => {
					const target = event.currentTarget as HTMLInputElement;
					field.handleChange(target.value);
				}}
			/>
		{/snippet}
	</createCommunityForm.Field>
	<createCommunityForm.Field name={'is_public'}>
		{#snippet children(field: AnyFieldApi)}
			<div class="flex items-center space-x-3">
				<Switch.Root
					id={field.name}
					name={field.name}
					class="focus-visible:ring-foreground focus-visible:ring-offset-background data-[state=checked]:bg-foreground data-[state=unchecked]:shadow-mini-inset dark:data-[state=checked]:bg-foreground peer inline-flex h-[22px] min-h-[22px] w-[36px] shrink-0 cursor-pointer items-center rounded-full px-[2px] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-pink-100"
				>
					<Switch.Thumb
						class="data-[state=unchecked]:shadow-mini dark:border-background/30 dark:bg-foreground dark:shadow-popover pointer-events-none block size-[18px] shrink-0 rounded-full bg-white transition-transform data-[state=checked]:translate-x-[14px] data-[state=unchecked]:translate-x-0 dark:border dark:data-[state=unchecked]:border"
					/>
				</Switch.Root>
				<Label for={field.name} class="text-sm font-medium">Public community</Label>
			</div>
		{/snippet}
	</createCommunityForm.Field>
	<createCommunityForm.Field name={'is_featured'}>
		{#snippet children(field: AnyFieldApi)}
			<div class="flex items-center space-x-3">
				<Switch.Root
					id={field.name}
					name={field.name}
					class="focus-visible:ring-foreground focus-visible:ring-offset-background data-[state=checked]:bg-foreground data-[state=unchecked]:shadow-mini-inset dark:data-[state=checked]:bg-foreground peer inline-flex h-[22px] min-h-[22px] w-[36px] shrink-0 cursor-pointer items-center rounded-full px-[2px] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-pink-100"
				>
					<Switch.Thumb
						class="data-[state=unchecked]:shadow-mini dark:border-background/30 dark:bg-foreground dark:shadow-popover pointer-events-none block size-[18px] shrink-0 rounded-full bg-white transition-transform data-[state=checked]:translate-x-[14px] data-[state=unchecked]:translate-x-0 dark:border dark:data-[state=unchecked]:border"
					/>
				</Switch.Root>
				<Label for={field.name} class="text-sm font-medium">Public community</Label>
			</div>
		{/snippet}
	</createCommunityForm.Field>
	<createCommunityForm.Field name={'rules'} mode="array">
		{#snippet children(field: AnyFieldApi)}
			<FormArrayInput
				{field}
				form={createCommunityForm}
				label={'Highlights'}
				addButtonText={'Add another highlight'}
				removeButtonText={'Remove'}
			/>
		{/snippet}
	</createCommunityForm.Field>
	<createCommunityForm.Field name={'contact_email'}>
		{#snippet children(field: AnyFieldApi)}
			<FormInput
				{field}
				name={field.name}
				label="Contact email"
				inputId={field.name}
				type="email"
				placeholder="contact@example.com"
				value={field.state.value}
				disabled={true}
				oninput={(event: HtmlInputEvent) => {
					const target = event.currentTarget as HTMLInputElement;
					field.handleChange(target.value);
				}}
			/>
		{/snippet}
	</createCommunityForm.Field>
	<createCommunityForm.Field name={'website'}>
		{#snippet children(field: AnyFieldApi)}
			<FormInput
				{field}
				name={field.name}
				label="Event name"
				inputId={field.name}
				type="text"
				placeholder="Event name"
				value={field.state.value}
				oninput={(event: HtmlInputEvent) => {
					const target = event.currentTarget as HTMLInputElement;
					field.handleChange(target.value);
				}}
			/>
		{/snippet}
	</createCommunityForm.Field>
	<createCommunityForm.Field name="location">
		{#snippet children(field: AnyFieldApi)}
			<LocationSearch
				value={field.state.value}
				placeholder="Search for your city..."
				label="Community location"
				onChange={(result) => field.handleChange(result)}
			/>
		{/snippet}
	</createCommunityForm.Field>
	<createCommunityForm.Field name={'category'}>
		{#snippet children(field: AnyFieldApi)}
			<FormMultiSelect
				forLabel={field.name}
				selectId={field.name}
				label="Category"
				placeholder="Select community categories"
				name={field.name}
				value={field.state.value || []}
				options={categoriesOptions}
				onValueChange={(selected) => field.handleChange(selected)}
			/>
		{/snippet}
	</createCommunityForm.Field>
	<createCommunityForm.Field name={'meeting_frequency'}>
		{#snippet children(field: AnyFieldApi)}
			<FormSelect
				forLabel={field.name}
				label='Meeting frequency'
				name={field.name}
				value={field.state.value}
				selectId="meeting-frequency"
				placeholder="How often do you meet?"
				options={meetingFrequencyOptions}
				onValueChange={(value) => {
					field.handleChange(value);
				}}
			/>
		{/snippet}
	</createCommunityForm.Field>
	<createCommunityForm.Field name={'long_description'}>
		{#snippet children(field: AnyFieldApi)}
			<FormTextarea
				id={field.name}
				forLabel={field.name}
				label="Long description"
				name={field.name}
				placeholder="Tell us more about your community..."
				value={field.state.value}
				oninput={(event: Event) => {
					field.handleChange((event.target as HTMLInputElement).value);
				}}
				onblur={() => field.handleBlur()}
				rows={4}
				maxlength={280}
			/>
		{/snippet}
	</createCommunityForm.Field>
  <createCommunityForm.Field name={'contact_phone'}>
		{#snippet children(field: AnyFieldApi)}
			<FormInput
				{field}
				name={field.name}
				label="Contact phone"
				inputId={field.name}
				type="text"
				placeholder="Contact phone"
				value={field.state.value}
				oninput={(event: HtmlInputEvent) => {
					const target = event.currentTarget as HTMLInputElement;
					field.handleChange(target.value);
				}}
			/>
		{/snippet}
	</createCommunityForm.Field>
  <createCommunityForm.Field name={'next_meeting_date'}>
    {#snippet children(field: AnyFieldApi)}
    <DateField.Root>
      <div class="flex w-full max-w-[280px] flex-col gap-1.5">
        <DateField.Label class="block select-none text-sm font-medium"
          >Next meeting date</DateField.Label
        >
        <DateField.Input
          class="h-input rounded-input border-border-input bg-background text-foreground focus-within:border-border-input-hover focus-within:shadow-date-field-focus hover:border-border-input-hover data-invalid:border-destructive flex w-full select-none items-center border px-2 py-3 text-sm tracking-[0.01em] "
        >
          {#snippet children({ segments })}
            {#each segments as { part, value }, i (part + i)}
              <div class="inline-block select-none">
                {#if part === "literal"}
                  <DateField.Segment {part} class="text-muted-foreground p-1">
                    {value}
                  </DateField.Segment>
                {:else}
                  <DateField.Segment
                    {part}
                    class="rounded-5px hover:bg-muted focus:bg-muted focus:text-foreground aria-[valuetext=Empty]:text-muted-foreground data-invalid:text-destructive focus-visible:ring-0! focus-visible:ring-offset-0! px-1 py-1"
                  >
                    {value}
                  </DateField.Segment>
                {/if}
              </div>
            {/each}
          {/snippet}
        </DateField.Input>
      </div>
    </DateField.Root>
    {/snippet}
  </createCommunityForm.Field>
  <createCommunityForm.Field name={'next_meeting_location'}>
		{#snippet children(field: AnyFieldApi)}
			<FormInput
				{field}
				name={field.name}
				label="Next meeting location"
				inputId={field.name}
				type="text"
				placeholder="Next meeting location"
				value={field.state.value}
				oninput={(event: HtmlInputEvent) => {
					const target = event.currentTarget as HTMLInputElement;
					field.handleChange(target.value);
				}}
			/>
		{/snippet}
	</createCommunityForm.Field>
  <createCommunityForm.Field name={'next_meeting_details'}>
		{#snippet children(field: AnyFieldApi)}
			<FormTextarea
				id={field.name}
				forLabel={field.name}
				label="Next meeting details"
				name={field.name}
				placeholder="Describe what will happen at the next meeting..."
				value={field.state.value}
				oninput={(event: Event) => {
					field.handleChange((event.target as HTMLInputElement).value);
				}}
				onblur={() => field.handleBlur()}
				rows={4}
				maxlength={280}
			/>
		{/snippet}
	</createCommunityForm.Field>
  <createCommunityForm.Field name={'community_type_id'}>
		{#snippet children(field: AnyFieldApi)}
			<FormSelect
				forLabel={field.name}
				label='Community type'
				name={field.name}
				value={field.state.value}
				selectId="community-type"
				placeholder="What type of community is this?"
				options={communityTypeOptions}
				onValueChange={(value) => {
					field.handleChange(value);
				}}
			/>
		{/snippet}
	</createCommunityForm.Field>
	<createCommunityForm.Subscribe
		selector={(state: AnyFormState) => ({
			canSubmit: state.canSubmit,
			isSubmitting: state.isSubmitting
		})}
	>
		{#snippet children({ canSubmit, isSubmitting }: { canSubmit: boolean; isSubmitting: boolean })}
			<Button
				type="submit"
				class="mt-6 w-full cursor-pointer bg-emerald-500 hover:bg-emerald-600"
				disabled={!canSubmit || isSubmitting}
			>
				{isSubmitting ? 'Submitting...' : 'Create this community'}
			</Button>
		{/snippet}
	</createCommunityForm.Subscribe>
</form>
