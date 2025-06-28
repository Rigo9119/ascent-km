<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { createForm, Field } from '@tanstack/svelte-form';
	import { z } from 'zod';
	import Loader2 from '@lucide/svelte/icons/loader';
	import { goto } from '$app/navigation';
	import FormInput from '@/lib/components/forms/components/form-input.svelte';
	import { file } from 'zod/v4';
	import Button from '@/lib/components/ui/button/button.svelte';

	const updateSchema = z
		.object({
			password: z
				.string()
				.min(8, 'Password must be at least 8 characters')
				.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
				.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
				.regex(/[0-9]/, 'Password must contain at least one number'),
			confirmPassword: z.string()
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: "Passwords don't match",
			path: ['confirmPassword']
		});

	type UpdateValues = z.infer<typeof updateSchema>;

	let isLoading = false;
	let error = '';

	const form = createForm(() => ({
		defaultValues: {
			password: '',
			confirmPassword: ''
		},
		onSubmit: async (values) => {
			try {
				isLoading = true;
				error = '';
				const { error: updateError } = await supabase.auth.updateUser({
					password: values.value.password
				});

				if (updateError) throw updateError;

				// Redirect to login page after successful password update
				goto('/auth?mode=login');
			} catch (e) {
				if (e instanceof Error) {
					error = e.message;
				} else {
					error = 'An unexpected error occurred';
				}
			} finally {
				isLoading = false;
			}
		},
		validator: updateSchema
	}));
</script>

<div class="flex min-h-screen items-center justify-center">
	<div class="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg">
		<div class="text-center">
			<h2 class="text-3xl font-bold">Update Password</h2>
			<p class="mt-2 text-sm text-gray-600">Enter your new password below.</p>
		</div>

		<form
			onsubmit={(event) => {
				event.preventDefault();
				event.stopPropagation();
				form.handleSubmit();
			}}
			class="mt-8 space-y-6"
		>
			<form.Field name="password">
				{#snippet children(field)}
					<FormInput
						{field}
						name={field.name}
						label="Password"
						inputId="password"
						required
						type="password"
					/>
				{/snippet}
			</form.Field>
			<form.Field name="confirmPassword">
				{#snippet children(field)}
					<FormInput
						{field}
						name="confirmPassword"
						label="Confirm Password"
						inputId="confirmPassword"
						required
						type="password"
					/>
				{/snippet}
			</form.Field>

			<form.Subscribe
				selector={(state) => ({
					canSubmit: state.canSubmit,
					isSubmitting: state.isSubmitting
				})}
			>
				{#snippet children({ canSubmit, isSubmitting })}
					<Button type="submit" disabled={!canSubmit} class="w-full">
						{isSubmitting ? 'Submitting' : 'Submit'}
					</Button>
				{/snippet}
			</form.Subscribe>
		</form>

		{#if error}
			<div class="rounded-md bg-red-50 p-4">
				<div class="flex">
					<div class="flex-shrink-0">
						<svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
							<path
								fill-rule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
					<div class="ml-3">
						<p class="text-sm text-red-700">{error}</p>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
