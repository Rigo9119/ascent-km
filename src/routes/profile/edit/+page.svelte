<script lang="ts">
	import { createForm } from '@tanstack/svelte-form';
	import { z } from 'zod';
	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';
	import Button from '@/lib/components/ui/button/button.svelte';
	import FormInput from '@/lib/components/forms/components/form-input.svelte';
	import { onMount } from 'svelte';
	import type { SupabaseClient, User } from '@supabase/supabase-js';

	// Get supabase from context
	const supabase = getContext<SupabaseClient>('supabase');

	let profile: any = {};
	let error = '';
	let avatarUploading = false;
	let avatarUrl = '';

	// Fetch current profile on mount
	onMount(async () => {
		const { data, error: fetchError } = await supabase.from('profiles').select('*').single();
		if (fetchError) {
			error = fetchError.message;
		} else {
			profile = data;
			avatarUrl = data.avatar_url;
		}
	});

	// Zod schema for validation
	const profileSchema = z.object({
		full_name: z.string().min(2, 'Name is required'),
		bio: z.string().optional(),
		phone: z.string().optional(),
		avatar_url: z.string().optional()
	});

	// TanStack Form
	const form = createForm(() => ({
		defaultValues: {
			full_name: profile.full_name || '',
			bio: profile.bio || '',
			phone: profile.phone || '',
			avatar_url: profile.avatar_url || ''
		},
		onSubmit: async ({ value }) => {
			error = '';
			const { error: updateError } = await supabase
				.from('profiles')
				.update(value)
				.eq('id', profile.id);
			if (updateError) {
				error = updateError.message;
			} else {
				goto('/profile');
			}
		},
		validator: profileSchema
	}));

	// Avatar upload handler
	async function handleAvatarChange(event: Event) {
		const input = event.target as HTMLInputElement;
		if (!input.files || input.files.length === 0) return;
		const file = input.files[0];
		avatarUploading = true;
		const fileExt = file.name.split('.').pop();
		const filePath = `avatars/${profile.id}.${fileExt}`;
		const { error: uploadError } = await supabase.storage
			.from('profile-avatars')
			.upload(filePath, file, { upsert: true });
		if (uploadError) {
			error = uploadError.message;
			avatarUploading = false;
			return;
		}
		const { data } = supabase.storage.from('profile-avatars').getPublicUrl(filePath);
		avatarUrl = data.publicUrl;
		form.setFieldValue('avatar_url', avatarUrl);
		avatarUploading = false;
	}
</script>

<div class="mx-auto max-w-2xl p-4">
	<h1 class="mb-4 text-2xl font-bold">Edit Profile</h1>
	{#if error}
		<div class="mb-4 text-red-600">{error}</div>
	{/if}
	<form
		onsubmit={(event) => {
			event.preventDefault(), event.stopPropagation();
			form.handleSubmit();
		}}
		class="space-y-4"
	>
		<form.Field name="full_name">
			{#snippet children(field)}
				<FormInput
					{field}
					name={field.name}
					inputId={field.name}
					type="text"
					label="Full Name"
					required
				/>
			{/snippet}
		</form.Field>
		<div>Text Area</div>
		<form.Field name="phone">
			{#snippet children(field)}
				<FormInput
					{field}
					name={field.name}
					inputId={field.name}
					type="text"
					label="Phone"
					required
				/>
			{/snippet}
		</form.Field>
		<div>
			<label class="mb-1 block font-semibold" for="avatar">Avatar</label>
			{#if avatarUrl}
				<img src={avatarUrl} alt="Avatar" class="mb-2 h-24 w-24 rounded-full" />
			{/if}
			<input type="file" accept="image/*" onchange={handleAvatarChange} />
			{#if avatarUploading}
				<div class="text-sm text-gray-500">Uploading...</div>
			{/if}
		</div>
		<form.Subscribe
			selector={(state) => ({
				canSubmit: state.canSubmit,
				isSubmitting: state.isSubmitting
			})}
		>
			{#snippet children({ canSubmit, isSubmitting })}
				<Button type="submit" class="w-full">Save</Button>
			{/snippet}
		</form.Subscribe>
	</form>
</div>
