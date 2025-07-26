<script lang="ts">
	import FormInput from '@/lib/components/forms/components/form-input.svelte';
	import { Button } from '@/lib/components/ui/button';
	import { type HtmlInputEvent } from '@/lib/types';
	import { createForm, type AnyFieldApi, type AnyFormState } from '@tanstack/svelte-form';
	import type { User } from '@supabase/supabase-js';

	interface CreateCommunityFormProps {
		categoriesOptions?: { value: string; label: string }[];
		meetingFrequencyOptions?: { value: string; label: string }[];
		communityTypeOptions?: { value: string; label: string }[];
		user: User;
	}

	const {
		categoriesOptions,
		meetingFrequencyOptions,
		communityTypeOptions,
		user
	}: CreateCommunityFormProps = $props();

	const handleInputChange = (field: AnyFieldApi) => (event: HtmlInputEvent) => {
		const target = event.currentTarget as HTMLInputElement;
		field.handleChange(target.value);
	};

	const createCommunityForm = createForm(() => ({
		defaultValues: {
			name: '',
			description: '',
			location: '',
			meeting_frequency: '',
			community_type_id: ''
		},
		validators: {
			onChange: ({ value }) => {
				const errors: Record<string, string> = {};
				
				if (!value.name?.trim()) {
					errors.name = 'Community name is required';
				} else if (value.name.length < 3) {
					errors.name = 'Community name must be at least 3 characters';
				}
				
				if (!value.description?.trim()) {
					errors.description = 'Description is required';
				}
				
				return Object.keys(errors).length > 0 ? errors : undefined;
			}
		},
		onSubmit: async ({ value }) => {
			console.log('Form submitted:', value);
		}
	}));
</script>

<form
	class="space-y-6 overflow-y-auto p-4"
	onsubmit={(e) => {
		e.preventDefault();
		e.stopPropagation();
		createCommunityForm.handleSubmit();
	}}
>
	<div class="space-y-4">
		<h3 class="border-b pb-2 text-lg font-semibold text-gray-900">Basic Information</h3>
		<createCommunityForm.Field name={'name'}>
			{#snippet children(field: AnyFieldApi)}
				<FormInput
					{field}
					name={field.name}
					label="Community name *"
					inputId={field.name}
					type="text"
					placeholder="Enter community name"
					value={field.state.value}
					required={true}
					oninput={handleInputChange(field)}
				/>
				{#if field.state.meta.errors.length > 0}
					<p class="mt-1 text-sm text-red-600">{field.state.meta.errors[0]}</p>
				{/if}
			{/snippet}
		</createCommunityForm.Field>
		<createCommunityForm.Field name={'description'}>
			{#snippet children(field: AnyFieldApi)}
				<FormInput
					{field}
					name={field.name}
					label="Short description *"
					inputId={field.name}
					type="text"
					placeholder="Brief description of your community"
					value={field.state.value}
					required={true}
					oninput={handleInputChange(field)}
				/>
				{#if field.state.meta.errors.length > 0}
					<p class="mt-1 text-sm text-red-600">{field.state.meta.errors[0]}</p>
				{/if}
			{/snippet}
		</createCommunityForm.Field>
	</div>

	<div class="border-t pt-4">
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
					{isSubmitting ? 'Creating Community...' : 'Create this community'}
				</Button>
			{/snippet}
		</createCommunityForm.Subscribe>
	</div>
</form>