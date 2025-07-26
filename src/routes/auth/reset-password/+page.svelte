<script lang="ts">
	import { createForm } from '@tanstack/svelte-form';
	import { zodValidator } from '@tanstack/zod-form-adapter';
	import { z } from 'zod';
	import Loader2 from '@lucide/svelte/icons/loader';
	import Button from '@/lib/components/ui/button/button.svelte';
	import FormInput from '@/lib/components/forms/components/form-input.svelte';
	import type { PageData } from '../$types';

	export let data: PageData;
	$: ({ supabase } = data);

	const resetSchema = z.object({
		email: z.string().email('Please enter a valid email')
	});

	let isLoading = false;
	let error = '';
	let success = false;

	const form = createForm(() => ({
		defaultValues: {
			email: ''
		},
		onSubmit: async (values) => {
			try {
				isLoading = true;
				error = '';

				const { error: resetError } = await supabase.auth.resetPasswordForEmail(
					values.value.email,
					{
						redirectTo: `${window.location.origin}/auth/update-password`
					}
				);

				if (resetError) throw resetError;
				success = true;
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
		validator: resetSchema
	}));
</script>

<div class="flex min-h-screen items-center justify-center">
	<div class="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg">
		<div class="text-center">
			<h2 class="text-3xl font-bold">Reset Password</h2>
			<p class="mt-2 text-sm text-gray-600">
				Enter your email address and we'll send you a link to reset your password.
			</p>
		</div>

		{#if !success}
			<form
				onsubmit={(event) => {
					event.preventDefault();
					event.stopPropagation();
					form.handleSubmit();
				}}
				class="mt-8 space-y-6"
			>
				<form.Field name="email">
					{#snippet children(field)}
						<FormInput
							{field}
							required
							name={field.name}
							label="Email"
							inputId="email"
							type="email"
							autocomplete="email"
						/>
					{/snippet}
				</form.Field>
				<Button
					type="submit"
					disabled={isLoading}
					class="group relative flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
				>
					{#if isLoading}
						<Loader2 class="mr-2 h-4 w-4 animate-spin" />
					{/if}
					Send Reset Link
				</Button>
			</form>
		{:else}
			<div class="rounded-md bg-green-50 p-4">
				<div class="flex">
					<div class="flex-shrink-0">
						<svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
							<path
								fill-rule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
					<div class="ml-3">
						<p class="text-sm font-medium text-green-800">
							Check your email for a password reset link.
						</p>
					</div>
				</div>
			</div>
		{/if}

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

		<Button
			variant="ghost"
			href="/auth"
			class="w-full text-sm text-indigo-600 hover:text-indigo-500"
		>
			Back to login
		</Button>
	</div>
</div>
