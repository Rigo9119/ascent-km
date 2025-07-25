<script lang="ts">
	import FormArrayInput from '@/lib/components/forms/components/form-array-input.svelte';
	import FormInput from '@/lib/components/forms/components/form-input.svelte';
	import FormMultiSelect from '@/lib/components/forms/components/form-multiselect.svelte';
	import FormTextarea from '@/lib/components/forms/components/form-textarea.svelte';
	import { Button } from '@/lib/components/ui/button';
	import Label from '@/lib/components/ui/label/label.svelte';
	import { type HtmlInputEvent } from '@/lib/types';
	import { createForm, type AnyFieldApi, type AnyFormState } from '@tanstack/svelte-form';
	import { Switch, TimeRangeField } from 'bits-ui';
	import { DateRangeField } from 'bits-ui';
	import { unstable_RatingGroup as RatingGroup } from 'bits-ui';

	// TODO: image, image_url, image_path are the same columns, have to delete tow
	// from supabase

	const createEventForm = createForm(() => ({
		defaultValues: {
			name: '',
			description: '',
			date: '',
			location_id: '',
			category_id: '',
			event_type_id: '',
			is_free: false,
			time: '',
			capacity: 0,
			organizer: '',
			contact: '',
			website: '',
			price: 0,
			requirements: [] as Array<string>,
			highlights: [] as Array<string>,
			long_description: '',
			is_featured: false,
			image_url: ''
		},
		onSubmit: async ({ value }) => {
			console.log('Creating event:', value);
			// TODO: Add API call to create event
			try {
				const response = await fetch('/api/events', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(value)
				});

				if (response.ok) {
					console.log('Event created successfully!');
					// TODO: Reset form or redirect
				} else {
					console.error('Failed to create event');
				}
			} catch (error) {
				console.error('Error creating event:', error);
			}
		}
	}));
</script>

<form
	class="overflow-y-auto p-4 space-y-6"
	onsubmit={(e) => {
		e.preventDefault();
		e.stopPropagation();
		createEventForm.handleSubmit();
	}}
>
	<!-- Basic Information Section -->
	<div class="space-y-4">
		<h3 class="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h3>
	<createEventForm.Field 
		name={'name'} 
		validators={{
			onChange: ({ value }) => {
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
		name={'description'}
		validators={{
			onChange: ({ value }) => {
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
	<createEventForm.Field name={'long_description'}>
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
		<h3 class="text-lg font-semibold text-gray-900 border-b pb-2">Date & Time</h3>
	<createEventForm.Field name={'date'}>
		{#snippet children(field: AnyFieldApi)}
			<DateRangeField.Root class="group flex w-full flex-col gap-1.5">
				<DateRangeField.Label class="block text-sm font-medium select-none">
					Event Date
				</DateRangeField.Label>
				<div
					class="h-input rounded bg-background text-foreground focus-within:border-border-input-hover focus-within:shadow-date-field-focus hover:border-border-input-hover group-data-invalid:border-destructive flex w-full items-center border px-2 py-2 text-sm tracking-[0.01em] select-none"
				>
					{#each ['start', 'end'] as const as type (type)}
						<DateRangeField.Input {type}>
							{#snippet children({ segments })}
								{#each segments as { part, value }, i (part + i)}
									<div class="inline-block select-none">
										{#if part === 'literal'}
											<DateRangeField.Segment {part} class="text-muted-foreground p-1">
												{value}
											</DateRangeField.Segment>
										{:else}
											<DateRangeField.Segment
												{part}
												class="rounded-5px hover:bg-muted focus:bg-muted focus:text-foreground aria-[valuetext=Empty]:text-muted-foreground px-1 py-1 focus-visible:ring-0! focus-visible:ring-offset-0!"
											>
												{value}
											</DateRangeField.Segment>
										{/if}
									</div>
								{/each}
							{/snippet}
						</DateRangeField.Input>
						{#if type === 'start'}
							<div aria-hidden="true" class="text-muted-foreground px-1">–⁠⁠⁠⁠⁠</div>
						{/if}
					{/each}
				</div>
			</DateRangeField.Root>
		{/snippet}
	</createEventForm.Field>
	<createEventForm.Field name={'location_id'}>
		{#snippet children(field: AnyFieldApi)}
			<FormMultiSelect
				forLabel={field.name}
				selectId={field.name}
				label="Location"
				placeholder="Select the event location"
				name={field.name}
				value={field.state.value || []}
				options={[]}
				onValueChange={(selected) => field.handleChange(selected)}
			/>
		{/snippet}
	</createEventForm.Field>
	<createEventForm.Field name={'category_id'}>
		{#snippet children(field: AnyFieldApi)}
			<FormMultiSelect
				forLabel={field.name}
				selectId={field.name}
				label="Category"
				placeholder="Select the category of the event"
				name={field.name}
				value={field.state.value || []}
				options={[]}
				onValueChange={(selected) => field.handleChange(selected)}
			/>
		{/snippet}
	</createEventForm.Field>
	<createEventForm.Field name={'event_type_id'}>
		{#snippet children(field: AnyFieldApi)}
			<FormMultiSelect
				forLabel={field.name}
				selectId={field.name}
				label="Type of event"
				placeholder="Select the event type"
				name={field.name}
				value={field.state.value || []}
				options={[]}
				onValueChange={(selected) => field.handleChange(selected)}
			/>
		{/snippet}
	</createEventForm.Field>
	<createEventForm.Field name={'is_free'}>
		{#snippet children(field: AnyFieldApi)}
			<div class="flex items-center space-x-3">
				<Switch.Root
					id={field.name}
					name={field.name}
					checked={field.state.value}
					onCheckedChange={(checked) => field.handleChange(checked)}
					class="focus-visible:ring-foreground focus-visible:ring-offset-background data-[state=checked]:bg-emerald-500 data-[state=unchecked]:shadow-mini-inset dark:data-[state=checked]:bg-emerald-500 peer inline-flex h-[22px] min-h-[22px] w-[36px] shrink-0 cursor-pointer items-center rounded-full px-[2px] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-gray-200"
				>
					<Switch.Thumb
						class="data-[state=unchecked]:shadow-mini dark:border-background/30 dark:bg-foreground dark:shadow-popover pointer-events-none block size-[18px] shrink-0 rounded-full bg-white transition-transform data-[state=checked]:translate-x-[14px] data-[state=unchecked]:translate-x-0 dark:border dark:data-[state=unchecked]:border"
					/>
				</Switch.Root>
				<Label for={field.name} class="text-sm font-medium">Is it a free event?</Label>
			</div>
		{/snippet}
	</createEventForm.Field>
	<createEventForm.Field name={'image_url'}>
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
	<createEventForm.Field name={'time'}>
		{#snippet children(field: AnyFieldApi)}
        <TimeRangeField.Root class="group flex w-full flex-col gap-1.5">
          <TimeRangeField.Label class="block select-none text-sm font-medium">
            Event times
          </TimeRangeField.Label>
          <div
            class="h-input rounded-md bg-background text-foreground focus-within:border-border-input-hover focus-within:shadow-date-field-focus hover:border-border-input-hover group-data-invalid:border-destructive flex w-full select-none items-center border px-2 py-2 text-sm tracking-[0.01em]"
          >
            {#each ["start", "end"] as const as type (type)}
              <TimeRangeField.Input {type}>
                {#snippet children({ segments })}
                  {#each segments as { part, value }, i (part + i)}
                    <div class="inline-block select-none">
                      {#if part === "literal"}
                        <TimeRangeField.Segment
                          {part}
                          class="text-muted-foreground p-1"
                        >
                          {value}
                        </TimeRangeField.Segment>
                      {:else}
                        <TimeRangeField.Segment
                          {part}
                          class="rounded-5px hover:bg-muted focus:bg-muted focus:text-foreground aria-[valuetext=Empty]:text-muted-foreground focus-visible:ring-0! focus-visible:ring-offset-0! px-1 py-1"
                        >
                          {value}
                        </TimeRangeField.Segment>
                      {/if}
                    </div>
                  {/each}
                {/snippet}
              </TimeRangeField.Input>
              {#if type === "start"}
                <div aria-hidden="true" class="text-muted-foreground pl-1 pr-2">to</div>
              {/if}
            {/each}
          </div>
        </TimeRangeField.Root>
		{/snippet}
	</createEventForm.Field>
	</div>

	<!-- Event Details Section -->
	<div class="space-y-4">
		<h3 class="text-lg font-semibold text-gray-900 border-b pb-2">Event Details</h3>
	<createEventForm.Field name={'capacity'}>
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
	<createEventForm.Field name={'organizer'}>
		{#snippet children(field: AnyFieldApi)}
			<FormInput
				{field}
				name={field.name}
				label="Organizer"
				inputId={field.name}
				type="text"
				placeholder="Organizer"
				value={field.state.value}
				oninput={(event: HtmlInputEvent) => {
					const target = event.currentTarget as HTMLInputElement;
					field.handleChange(target.value);
				}}
			/>
		{/snippet}
	</createEventForm.Field>
	<createEventForm.Field name={'contact'}>
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
	<createEventForm.Field name={'website'}>
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
	<createEventForm.Field name={'price'}>
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
	<createEventForm.Field name={'requirements'} mode="array">
		{#snippet children(field: AnyFieldApi)}
			<FormArrayInput
				{field}
				form={createEventForm}
				label={'Requirements'}
				addButtonText={'Add another requirement'}
				removeButtonText={'Remove'}
			/>
		{/snippet}
	</createEventForm.Field>
	<createEventForm.Field name={'highlights'} mode="array">
		{#snippet children(field: AnyFieldApi)}
			<FormArrayInput
				{field}
				form={createEventForm}
				label={'Highlights'}
				addButtonText={'Add another highlight'}
				removeButtonText={'Remove'}
			/>
		{/snippet}
	</createEventForm.Field>
	<createEventForm.Field name={'is_featured'}>
		{#snippet children(field: AnyFieldApi)}
			<div class="flex items-center space-x-3">
				<Switch.Root
					id={field.name}
					name={field.name}
					checked={field.state.value}
					onCheckedChange={(checked) => field.handleChange(checked)}
					class="focus-visible:ring-foreground focus-visible:ring-offset-background data-[state=checked]:bg-emerald-500 data-[state=unchecked]:shadow-mini-inset dark:data-[state=checked]:bg-emerald-500 peer inline-flex h-[22px] min-h-[22px] w-[36px] shrink-0 cursor-pointer items-center rounded-full px-[2px] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-gray-200"
				>
					<Switch.Thumb
						class="data-[state=unchecked]:shadow-mini dark:border-background/30 dark:bg-foreground dark:shadow-popover pointer-events-none block size-[18px] shrink-0 rounded-full bg-white transition-transform data-[state=checked]:translate-x-[14px] data-[state=unchecked]:translate-x-0 dark:border dark:data-[state=unchecked]:border"
					/>
				</Switch.Root>
				<Label for={field.name} class="text-sm font-medium">Featured Event</Label>
			</div>
		{/snippet}
	</createEventForm.Field>
	<createEventForm.Field name={'rating'}>
		{#snippet children(field)}
			<div>
				<Label>Rating</Label>
				<RatingGroup.Root max={5} class="flex flex-row">
					{#snippet children({ items })}
						{#each items as item (item.index)}
							<RatingGroup.Item index={item.index}>
								{#if item.state === 'active'}
									⭐
								{:else}
									☆
								{/if}
							</RatingGroup.Item>
						{/each}
					{/snippet}
				</RatingGroup.Root>
			</div>
		{/snippet}
	</createEventForm.Field>
	</div>

	<!-- Submit Section -->
	<div class="pt-4 border-t">
	<createEventForm.Subscribe
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
				{isSubmitting ? 'Creating Event...' : 'Create Event'}
			</Button>
		{/snippet}
	</createEventForm.Subscribe>
	</div>
</form>
