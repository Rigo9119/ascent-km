<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { createForm, Field } from '@tanstack/svelte-form';
	import { authSchema, type AuthValues } from '$lib/schemas/auth';
	import Loader2 from '@lucide/svelte/icons/loader';
	import { browser } from '$app/environment';
	import type { AuthError } from '@supabase/supabase-js';
	import FormInput from '@/lib/components/forms/components/form-input.svelte';
	import Button from '@/lib/components/ui/button/button.svelte';

	$: mode = $page.url.searchParams.get('mode') === 'signup' ? 'signup' : 'login';
	let isLoading = false;
	let error = '';
	let success = false;
	// Create form with TanStack Form
	const form = createForm(() => ({
		defaultValues: {
			email: '',
			password: '',
			rememberMe: false
		},
		onSubmit: async ({ value: { email, password, rememberMe } }) => {
			try {
				isLoading = true;
				error = '';
				success = false;

				if (mode === 'login') {
					const { error: signInError } = await supabase.auth.signInWithPassword({
						email,
						password
					});
					if (signInError) throw signInError;
					goto('/');
				} else {
					const { error: signUpError, data } = await supabase.auth.signUp({
						email,
						password,
						options: {
							emailRedirectTo: `${window.location.origin}/auth/verify`
						}
					});
					if (signUpError) throw signUpError;

					// Show verification message instead of redirecting
					if (data?.user?.identities?.length === 0) {
						error = 'This email is already registered. Please try logging in.';
						return;
					}
					success = true;
					return;
				}
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
		validator: authSchema
	}));

	// OAuth sign in handlers
	async function signInWithGoogle() {
		try {
			isLoading = true;
			error = '';
			const { error: signInError } = await supabase.auth.signInWithOAuth({
				provider: 'google',
				options: {
					redirectTo: `${window.location.origin}/`
				}
			});
			if (signInError) throw signInError;
		} catch (e) {
			if (e instanceof Error) {
				error = e.message;
			} else {
				error = 'An unexpected error occurred';
			}
		} finally {
			isLoading = false;
		}
	}

	async function signInWithGithub() {
		try {
			isLoading = true;
			error = '';
			const { error: signInError } = await supabase.auth.signInWithOAuth({
				provider: 'github',
				options: {
					redirectTo: `${window.location.origin}/`
				}
			});
			if (signInError) throw signInError;
		} catch (e) {
			if (e instanceof Error) {
				error = e.message;
			} else {
				error = 'An unexpected error occurred';
			}
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="flex min-h-screen items-center justify-center">
	<div class="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg">
		<div class="text-center">
			<h2 class="text-3xl font-bold">{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
			{#if !success}
				<p class="mt-2 text-sm text-gray-600">Or continue with</p>
				<div class="mt-3 flex justify-center gap-3">
					<Button
						type="button"
						disabled={isLoading}
						onclick={signInWithGoogle}
						class="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50 disabled:opacity-50"
					>
						<img src="/google.svg" alt="Google" class="h-5 w-5" />
						Google
					</Button>
					<Button
						type="button"
						disabled={isLoading}
						onclick={signInWithGithub}
						class="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50 disabled:opacity-50"
					>
						<img src="/github.svg" alt="GitHub" class="h-5 w-5" />
						GitHub
					</Button>
				</div>
				<div class="relative mt-6">
					<div class="absolute inset-0 flex items-center">
						<div class="w-full border-t border-gray-300"></div>
					</div>
					<div class="relative flex justify-center text-sm">
						<p class="bg-white px-2 text-gray-500">Or continue with email</p>
					</div>
				</div>
			{/if}
		</div>

		{#if success}
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
							Please check your email for a verification link to complete your registration.
						</p>
					</div>
				</div>
			</div>
		{:else}
			<form
				onsubmit={(event) => {
					event.preventDefault();
					event.stopPropagation();
					form.handleSubmit();
				}}
			>
				<form.Field name="email">
					{#snippet children(field)}
						<FormInput
							{field}
							required
							name="email"
							label="Email"
							inputId="email"
							type="email"
							autocomplete="email"
						/>
					{/snippet}
				</form.Field>
				<form.Field name="password">
					{#snippet children(field)}
						<FormInput
							{field}
							required
							name="password"
							label="Password"
							inputId="password"
							type="password"
							autocomplete={mode === 'login' ? 'current-password' : 'new-password'}
						/>
					{/snippet}
				</form.Field>
				<div class="mt-6">
					<Button
						type="submit"
						class="w-full"
						disabled={isLoading}
					>
						{isLoading ? 'Loading...' : (mode === 'login' ? 'Login' : 'Sign Up')}
					</Button>
				</div>
			</form>
		{/if}

		<div class="mt-4 text-center">
			<Button
        variant="ghost"
				class="text-sm text-indigo-600 hover:text-indigo-500"
				onclick={() => {
					mode = mode === 'login' ? 'signup' : 'login';
					if (browser) {
						const url = new URL(window.location.href);
						url.searchParams.set('mode', mode);
						window.history.replaceState({}, '', url.toString());
					}
				}}
			>
				{mode === 'login' ? 'Need an account? Sign Up' : 'Already have an account? Login'}
			</Button>
		</div>

		{#if error}
			<div class="mt-4 rounded-md bg-red-50 p-4">
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
