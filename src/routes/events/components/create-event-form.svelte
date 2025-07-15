<script lang="ts">
	import FormInput from '@/lib/components/forms/components/form-input.svelte';
	import FormMultiSelect from '@/lib/components/forms/components/form-multiselect.svelte';
	import FormTextarea from '@/lib/components/forms/components/form-textarea.svelte';
	import { Button } from '@/lib/components/ui/button';
	import Label from '@/lib/components/ui/label/label.svelte';
	import { type HtmlInputEvent } from '@/lib/types';
	import { createForm, type AnyFieldApi, type AnyFormState } from '@tanstack/svelte-form';
	import { Switch } from 'bits-ui';
	import { DateRangeField } from 'bits-ui';
  import { unstable_RatingGroup as RatingGroup } from "bits-ui";

	// TODO: image, image_url, image_path are the same columns, have to delete tow
	// from supabase

	const createEventForm = createForm(() => ({
		defaultValues: {
			id: '',
			name: '',
			description: '',
			date: '',
			location_id: '',
			category_id: '',
			event_type_id: '',
			is_free: '',
			image: '',
			time: '',
			capacity: '',
			organizer: '',
			contact: '',
			website: '',
			price: '',
			requirements: [''] as Array<string>,
			highlights: [''],
			long_description: '',
			is_featured: '',
			rating: '',
			created_at: '',
			updated_at: '',
			image_url: '',
			image_path: ''
		},
		onSubmit: async ({ value }) => {
			console.log('create event form: ', value);
		}
	}));
</script>

<form class="p-4 overflow-y-auto">
	<createEventForm.Field name={'name'}>
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
	</createEventForm.Field>
	<createEventForm.Field name={'description'}>
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
	</createEventForm.Field>
	<createEventForm.Field name={'long_description'}>
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
	</createEventForm.Field>
	<createEventForm.Field name={'date'}>
		{#snippet children(field: AnyFieldApi)}
			<div>
				<DateRangeField.Root class="group flex w-full max-w-[320px] flex-col gap-1.5">
					<DateRangeField.Label class="block text-sm font-medium select-none">
						Date
					</DateRangeField.Label>
					<div
						class=""
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
													class=""
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
			</div>
		{/snippet}
	</createEventForm.Field>
	<createEventForm.Field name={'location_id'}>
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
			<div>
				<Switch.Root
					id={field.name}
					name={field.name}
					class=""
				>
					<Switch.Thumb
						class=""
					/>
				</Switch.Root>
				<Label>Is it public ?</Label>
			</div>
		{/snippet}
	</createEventForm.Field>
	<createEventForm.Field name={'image_url'}>
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
	</createEventForm.Field>
	<createEventForm.Field name={'time'}>
		{#snippet children(field: AnyFieldApi)}
			<div>
				<DateRangeField.Root class="group flex w-full max-w-[320px] flex-col gap-1.5">
					<DateRangeField.Label class="block text-sm font-medium select-none">
						Time range
					</DateRangeField.Label>
					<div
						class=""
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
			</div>
		{/snippet}
	</createEventForm.Field>
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
	<createEventForm.Field name={'contact'}>
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
	<createEventForm.Field name={'website'}>
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
	<createEventForm.Field name={'price'}>
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
	<createEventForm.Field name={'requirements'}>
		{#snippet children(field: AnyFieldApi)}
			<div>
				<Label class="text-base font-medium">Requirements</Label>
				{#each field.state.value as requirement, i (i)}
					<createEventForm.Field name={`requirements[${i}]`}>
						{#snippet children(subfield)}
							<FormInput
								name={subfield.name}
								inputId={subfield.name}
								type="text"
								placeholder="Your username"
								value={requirement}
								oninput={(event: HtmlInputEvent) => {
									const target = event.currentTarget as HTMLInputElement;
									subfield.handleChange(target.value);
								}}
							/>
						{/snippet}
					</createEventForm.Field>
				{/each}
				<Button onclick={() => field.pushValue('')} type="button">
					Add a requirement
				</Button>
			</div>
		{/snippet}
	</createEventForm.Field>
	<createEventForm.Field name={'highlights'}>
    {#snippet children(field: AnyFieldApi)}
    <div>
      <Label class="text-base font-medium">Requirements</Label>
      {#each field.state.value as highlit, i (i)}
        <createEventForm.Field name={`highlights[${i}]`}>
          {#snippet children(subfield)}
            <FormInput
              name={subfield.name}
              inputId={subfield.name}
              type="text"
              placeholder="Your username"
              value={highlit}
              oninput={(event: HtmlInputEvent) => {
                const target = event.currentTarget as HTMLInputElement;
                subfield.handleChange(target.value);
              }}
            />
          {/snippet}
        </createEventForm.Field>
      {/each}
      <Button onclick={() => field.pushValue('')} type="button">
        Add a highlight
      </Button>
    </div>
  {/snippet}
  </createEventForm.Field>
	<createEventForm.Field name={'is_featured'}>
		{#snippet children(field: AnyFieldApi)}
			<div>
				<Switch.Root
					id={field.name}
					name={field.name}
					class=""
				>
					<Switch.Thumb
						class=""
					/>
				</Switch.Root>
				<Label>Want to feature it ?</Label>
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
                {#if item.state === "active"}
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
  <createEventForm.Subscribe
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
</createEventForm.Subscribe>
</form>
