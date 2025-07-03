<script lang="ts">
	import FormInput from '@/lib/components/forms/components/form-input.svelte';
	import Button from '@/lib/components/ui/button/button.svelte';
	import type { AuthMode } from '@/lib/utils';
	import type { AnyFieldApi, AnyFormApi, AnyFormState, FormApi } from '@tanstack/svelte-form';

	type LoginFormProps = {
		form: any;
		mode: AuthMode;
		isLoading: boolean;
	};

	let { form, mode, isLoading }: LoginFormProps = $props();
</script>

<form
	onsubmit={(event) => {
		event.preventDefault();
		event.stopPropagation();
		form.handleSubmit();
	}}
	class="flex w-full flex-col items-center justify-between gap-2"
>
	<form.Field name="email">
		{#snippet children(field: AnyFieldApi)}
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
		{#snippet children(field: AnyFieldApi)}
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
	<form.Subscribe
		selector={(state: AnyFormState) => ({
			canSubmit: state.canSubmit,
			isSubmitting: state.isSubmitting
		})}
	>
		{#snippet children()}
			<Button type="submit" class="w-full">
				{isLoading ? 'Loading...' : mode === 'login' ? 'Login' : 'Sign Up'}
			</Button>
		{/snippet}
	</form.Subscribe>
</form>
