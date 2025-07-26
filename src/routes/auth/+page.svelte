<script lang="ts">
	import { goto } from '$app/navigation';
	import { createForm } from '@tanstack/svelte-form';
	import { authSchema } from '$lib/schemas/auth';
	import Button from '@/lib/components/ui/button/button.svelte';
	import type { PageData } from './$types';
	import LoginProviders from './components/login-providers.svelte';
	import ErrorMessage from './components/error-mesage.svelte';
	import { authMode, type AuthMode } from '@/lib/utils';
	import LoginForm from './components/login-form.svelte';
	import SuccessMessage from './components/success-message.svelte';

	export let data: PageData;
	$: ({ supabase, mode } = data);

	let isLoading = false;
	let error = '';
	let success = false;

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
					goto('/', { invalidateAll: true });
				} else {
					const { error: signUpError, data } = await supabase.auth.signUp({
						email,
						password,
						options: {
							emailRedirectTo: `${window.location.origin}/auth/verify`
						}
					});
					if (signUpError) throw signUpError;

					// Show error if email is already registered
					if (data?.user?.identities?.length === 0) {
						error = 'This email is already registered. Please try logging in.';
						return;
					}
					// Redirect to onboarding after successful signup
					await goto('/auth/onboarding');
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

	async function signInWithKakao() {
		try {
			isLoading = true;
			error = '';
			const { error: signInError } = await supabase.auth.signInWithOAuth({
				provider: 'kakao',
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
				<LoginProviders {isLoading} {signInWithGoogle} {signInWithKakao} />
			{/if}
		</div>

		{#if success}
			<SuccessMessage />
		{:else}
			<LoginForm {form} {mode} {isLoading} />
		{/if}

		<div class="mt-4 text-center">
			<Button
				variant="ghost"
				class="text-black-600 cursor-pointer text-sm underline-offset-4 hover:underline"
				onclick={() => authMode(mode as unknown as AuthMode)}
			>
				{mode === 'login' ? 'Need an account? Sign Up' : 'Already have an account? Login'}
			</Button>
		</div>

		{#if error}
			<ErrorMessage {error} />
		{/if}
	</div>
</div>
