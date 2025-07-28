<script lang="ts">
	import FormArrayInput from '@/lib/components/forms/components/form-array-input.svelte';
	import FormInput from '@/lib/components/forms/components/form-input.svelte';
	import FormTextarea from '@/lib/components/forms/components/form-textarea.svelte';
	import { Button } from '@/lib/components/ui/button';
	import Label from '@/lib/components/ui/label/label.svelte';
	import { type HtmlInputEvent } from '@/lib/types';
	import { createForm, type AnyFieldApi, type AnyFormState } from '@tanstack/svelte-form';
	import { Switch, TimeRangeField } from 'bits-ui';
	import FormDateRange from '@/lib/components/forms/components/form-date-range.svelte';
	import type { DateValue, Time } from '@internationalized/date';
	import type { User } from '@supabase/supabase-js';
	import FormSelect from '@/lib/components/forms/components/form-select.svelte';
	import { formatToTimestamp, formatTimeRange } from '@/lib/utils';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	type SelectOptions = Array<{ value: string; label: string }>;

	interface CreateEventFormProps {
		categoriesOptions: SelectOptions;
		locationOptions: SelectOptions;
		eventTypeOptions: SelectOptions;
		user: User;
	}

	const { categoriesOptions, locationOptions, eventTypeOptions, user }: CreateEventFormProps =
		$props();

	const createEventForm = createForm(() => ({
		defaultValues: {
			name: '',
			description: '',
			date: undefined as DateValue | undefined,
			location_id: '',
			category_id: '',
			event_type_id: '',
			is_free: false,
			time: { start: undefined, end: undefined } as {
				start: Time | undefined;
				end: Time | undefined;
			},
			capacity: 0,
			organizer: user.email,
			contact: '',
			website: '',
			price: 0,
			requirements: [] as Array<string>,
			highlights: [] as Array<string>,
			long_description: '',
			is_featured: false,
			image_url: '',
			rating: 0.0
		},
		onSubmit: async ({ value }) => {
			try {
				// Convert DateValue and Time to timestamptz format
				const eventTimeStamp = formatToTimestamp(value.date as DateValue, value.time);

				// Also create a separate formatted time range for display/storage if needed
				const formattedTimeRange = formatTimeRange(value.time);

				// Create the payload with formatted values
				const eventPayload = {
					...value,
					id: crypto.randomUUID(),
					date: eventTimeStamp,
					time: formattedTimeRange
				};

				const response = await fetch('/api/events', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(eventPayload)
				});

				const result = await response.json();

				if (response.ok && result.success) {
					toast.success('Event created successfully!', {
						description: `${result.event.name} has been created and is now live.`
					});
					// Redirect to the event page
					goto(`/events/${result.event.id}`);
				} else {
					toast.error('Failed to create event', {
						description: result.error || 'Something went wrong. Please try again.'
					});
				}
			} catch (error) {
				toast.error('Network error', {
					description: 'Unable to create event. Please check your connection and try again.'
				});
				throw new Error(`Error creating event: ${error}`);
			}
		}
	}));
</script>

<form
	class="space-y-6 overflow-y-auto p-4"
	onsubmit={(e) => {
		e.preventDefault();
		e.stopPropagation();
		createEventForm.handleSubmit();
	}}
>
	<!-- Basic Information Section -->
	<div class="space-y-4">
		<h3 class="border-b pb-2 text-lg font-semibold text-gray-900">Basic Information</h3>
		<createEventForm.Field
			name="name"
			validators={{
				onChange: ({ value }: { value: string }) => {
					if (!value || value.length < 3) {
						return 'Event name must be at least 3 characters long';
					}
					return undefined;
				}
			}}
		>
			{#snippet children(field: AnyFieldApi)}
				<FormInput
					{field}
					name={field.name}
					label="Event name *"
					inputId={field.name}
					type="text"
					placeholder="Enter event name"
					value={field.state.value}
					oninput={(event: HtmlInputEvent) => {
						const target = event.currentTarget as HTMLInputElement;
						field.handleChange(target.value);
					}}
				/>
			{/snippet}
		</createEventForm.Field>
		<createEventForm.Field
			name="description"
			validators={{
				onChange: ({ value }: { value: string }) => {
					if (!value || value.length < 10) {
						return 'Description must be at least 10 characters long';
					}
					return undefined;
				}
			}}
		>
			{#snippet children(field: AnyFieldApi)}
				<FormInput
					{field}
					name={field.name}
					label="Short description *"
					inputId={field.name}
					type="text"
					placeholder="Brief description of the event"
					value={field.state.value}
					oninput={(event: HtmlInputEvent) => {
						const target = event.currentTarget as HTMLInputElement;
						field.handleChange(target.value);
					}}
				/>
			{/snippet}
		</createEventForm.Field>
		<createEventForm.Field name="long_description">
			{#snippet children(field: AnyFieldApi)}
				<FormTextarea
					id={field.name}
					forLabel={field.name}
					label="Long Description"
					name={field.name}
					placeholder="Provide detailed information about the event..."
					value={field.state.value}
					oninput={(event: Event) => {
						field.handleChange((event.target as HTMLInputElement).value);
					}}
					onblur={() => field.handleBlur()}
					rows={4}
					maxlength={500}
				/>
			{/snippet}
		</createEventForm.Field>
	</div>

	<!-- Date & Time Section -->
	<div class="space-y-4">
		<h3 class="border-b pb-2 text-lg font-semibold text-gray-900">Date & Time</h3>
		<createEventForm.Field name="date">
			{#snippet children(field: AnyFieldApi)}
				<FormDateRange
					label="Event Date"
					value={field.state.value}
					onValueChange={(value) => field.handleChange(value)}
				/>
			{/snippet}
		</createEventForm.Field>
		<createEventForm.Field name="location_id">
			{#snippet children(field: AnyFieldApi)}
				<FormSelect
					forLabel={field.name}
					selectId={field.name}
					label="Location"
					placeholder="Select the event location"
					name={field.name}
					value={field.state.value || ''}
					options={locationOptions}
					onValueChange={(selected) => field.handleChange(selected)}
				/>
			{/snippet}
		</createEventForm.Field>
		<createEventForm.Field name="category_id">
			{#snippet children(field: AnyFieldApi)}
				<FormSelect
					forLabel={field.name}
					selectId={field.name}
					label="Category"
					placeholder="Select the category of the event"
					name={field.name}
					value={field.state.value || ''}
					options={categoriesOptions}
					onValueChange={(selected) => field.handleChange(selected)}
				/>
			{/snippet}
		</createEventForm.Field>
		<createEventForm.Field name="event_type_id">
			{#snippet children(field: AnyFieldApi)}
				<FormSelect
					forLabel={field.name}
					selectId={field.name}
					label="Type of event"
					placeholder="Select the event type"
					name={field.name}
					value={field.state.value || ''}
					options={eventTypeOptions}
					onValueChange={(selected) => field.handleChange(selected)}
				/>
			{/snippet}
		</createEventForm.Field>
		<createEventForm.Field name="is_free">
			{#snippet children(field: AnyFieldApi)}
				<div class="flex items-center space-x-3">
					<Switch.Root
						id={field.name}
						name={field.name}
						checked={field.state.value}
						onCheckedChange={(checked) => field.handleChange(checked)}
						class="focus-visible:ring-foreground focus-visible:ring-offset-background data-[state=unchecked]:shadow-mini-inset peer inline-flex h-[22px] min-h-[22px] w-[36px] shrink-0 cursor-pointer items-center rounded-full px-[2px] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-gray-200 dark:data-[state=checked]:bg-emerald-500"
					>
						<Switch.Thumb
							class="data-[state=unchecked]:shadow-mini dark:border-background/30 dark:bg-foreground dark:shadow-popover pointer-events-none block size-[18px] shrink-0 rounded-full bg-white transition-transform data-[state=checked]:translate-x-[14px] data-[state=unchecked]:translate-x-0 dark:border dark:data-[state=unchecked]:border"
						/>
					</Switch.Root>
					<Label for={field.name} class="text-sm font-medium">Is it a free event?</Label>
				</div>
			{/snippet}
		</createEventForm.Field>
		<createEventForm.Field name="image_url">
			{#snippet children(field: AnyFieldApi)}
				<FormInput
					name={field.name}
					label="Event Image"
					inputId={field.name}
					type="file"
					customClass="block"
					accept="image/*"
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
		</createEventForm.Field>
		<createEventForm.Field name="time">
			{#snippet children(field: AnyFieldApi)}
				<TimeRangeField.Root
					class="group flex w-full flex-col gap-1.5"
					value={field.state.value}
					onValueChange={(value) => {
						field.handleChange(value);
					}}
				>
					<TimeRangeField.Label class="block text-sm font-medium select-none">
						Event times
					</TimeRangeField.Label>
					<div
						class="h-input bg-background text-foreground focus-within:border-border-input-hover focus-within:shadow-date-field-focus hover:border-border-input-hover group-data-invalid:border-destructive flex w-full items-center rounded-md border px-2 py-2 text-sm tracking-[0.01em] select-none"
					>
						{#each ['start', 'end'] as const as type (type)}
							<TimeRangeField.Input {type}>
								{#snippet children({ segments })}
									{#each segments as { part, value }, i (part + i)}
										<div class="inline-block select-none">
											{#if part === 'literal'}
												<TimeRangeField.Segment {part} class="text-muted-foreground p-1">
													{value}
												</TimeRangeField.Segment>
											{:else}
												<TimeRangeField.Segment
													{part}
													class="rounded-5px hover:bg-muted focus:bg-muted focus:text-foreground aria-[valuetext=Empty]:text-muted-foreground px-1 py-1 focus-visible:ring-0! focus-visible:ring-offset-0!"
												>
													{value}
												</TimeRangeField.Segment>
											{/if}
										</div>
									{/each}
								{/snippet}
							</TimeRangeField.Input>
							{#if type === 'start'}
								<div aria-hidden="true" class="text-muted-foreground pr-2 pl-1">to</div>
							{/if}
						{/each}
					</div>
				</TimeRangeField.Root>
			{/snippet}
		</createEventForm.Field>
	</div>

	<!-- Event Details Section -->
	<div class="space-y-4">
		<h3 class="border-b pb-2 text-lg font-semibold text-gray-900">Event Details</h3>
		<createEventForm.Field name="capacity">
			{#snippet children(field: AnyFieldApi)}
				<FormInput
					{field}
					name={field.name}
					label="Capacity"
					inputId={field.name}
					type="number"
					placeholder="Capacity"
					value={field.state.value}
					oninput={(event: HtmlInputEvent) => {
						const target = event.currentTarget as HTMLInputElement;
						field.handleChange(target.value);
					}}
				/>
			{/snippet}
		</createEventForm.Field>
		<createEventForm.Field name="organizer">
			{#snippet children(field: AnyFieldApi)}
				<FormInput
					{field}
					name={field.name}
					label="Organizer"
					inputId={field.name}
					type="text"
					disabled={true}
					placeholder={user.email}
					value={field.state.value}
					oninput={(event: HtmlInputEvent) => {
						const target = event.currentTarget as HTMLInputElement;
						field.handleChange(target.value);
					}}
				/>
			{/snippet}
		</createEventForm.Field>
		<createEventForm.Field name="contact">
			{#snippet children(field: AnyFieldApi)}
				<FormInput
					{field}
					name={field.name}
					label="Contact"
					inputId={field.name}
					type="text"
					placeholder="Contact"
					value={field.state.value}
					oninput={(event: HtmlInputEvent) => {
						const target = event.currentTarget as HTMLInputElement;
						field.handleChange(target.value);
					}}
				/>
			{/snippet}
		</createEventForm.Field>
		<createEventForm.Field name="website">
			{#snippet children(field: AnyFieldApi)}
				<FormInput
					{field}
					name={field.name}
					label="Website"
					inputId={field.name}
					type="text"
					placeholder="Website"
					value={field.state.value}
					oninput={(event: HtmlInputEvent) => {
						const target = event.currentTarget as HTMLInputElement;
						field.handleChange(target.value);
					}}
				/>
			{/snippet}
		</createEventForm.Field>
		<createEventForm.Field name="price">
			{#snippet children(field: AnyFieldApi)}
				<FormInput
					{field}
					name={field.name}
					label="Price"
					inputId={field.name}
					type="number"
					placeholder="Price"
					value={field.state.value}
					oninput={(event: HtmlInputEvent) => {
						const target = event.currentTarget as HTMLInputElement;
						field.handleChange(target.value);
					}}
				/>
			{/snippet}
		</createEventForm.Field>
		<createEventForm.Field name="requirements" mode="array">
			{#snippet children(field: AnyFieldApi)}
				<FormArrayInput
					{field}
					form={createEventForm}
					label="Requirements"
					addButtonText="Add another requirement"
					removeButtonText="Remove"
				/>
			{/snippet}
		</createEventForm.Field>
		<createEventForm.Field name="highlights" mode="array">
			{#snippet children(field: AnyFieldApi)}
				<FormArrayInput
					{field}
					form={createEventForm}
					label="Highlights"
					addButtonText="Add another highlight"
					removeButtonText="Remove"
				/>
			{/snippet}
		</createEventForm.Field>
		<createEventForm.Field name="is_featured">
			{#snippet children(field: AnyFieldApi)}
				<div class="flex items-center space-x-3">
					<Switch.Root
						id={field.name}
						name={field.name}
						checked={field.state.value}
						onCheckedChange={(checked) => field.handleChange(checked)}
						class="focus-visible:ring-foreground focus-visible:ring-offset-background data-[state=unchecked]:shadow-mini-inset peer inline-flex h-[22px] min-h-[22px] w-[36px] shrink-0 cursor-pointer items-center rounded-full px-[2px] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-gray-200 dark:data-[state=checked]:bg-emerald-500"
					>
						<Switch.Thumb
							class="data-[state=unchecked]:shadow-mini dark:border-background/30 dark:bg-foreground dark:shadow-popover pointer-events-none block size-[18px] shrink-0 rounded-full bg-white transition-transform data-[state=checked]:translate-x-[14px] data-[state=unchecked]:translate-x-0 dark:border dark:data-[state=unchecked]:border"
						/>
					</Switch.Root>
					<Label for={field.name} class="text-sm font-medium">Featured Event</Label>
				</div>
			{/snippet}
		</createEventForm.Field>
	</div>

	<!-- Submit Section -->
	<div class="border-t pt-4">
		<createEventForm.Subscribe
			selector={(state: AnyFormState) => ({
				canSubmit: state.canSubmit,
				isSubmitting: state.isSubmitting
			})}
		>
			{#snippet children({ isSubmitting }: { canSubmit: boolean; isSubmitting: boolean })}
				<Button
					type="submit"
					class="mt-6 w-full cursor-pointer bg-emerald-500 hover:bg-emerald-600"
				>
					{isSubmitting ? 'Creating Event...' : 'Create Event'}
				</Button>
			{/snippet}
		</createEventForm.Subscribe>
	</div>
</form>
