<script lang="ts">
	import FormInput from '@/lib/components/forms/components/form-input.svelte';
	import Button from '@/lib/components/ui/button/button.svelte';
	import { type HtmlInputEvent } from '@/lib/types';
	import type { AuthMode } from '@/lib/utils';
	import type { AnyFieldApi, AnyFormApi, AnyFormState, FormApi } from '@tanstack/svelte-form';

	type LoginFormProps = {
		form: AnyFormApi;
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
				name={field.name}
				label="Email"
				inputId={field.name}
				type="email"
				autocomplete="email"
				placeholder="example@email.com"
				value={field.state.value}
				oninput={(event: HtmlInputEvent) => {
					const target = event.currentTarget as HTMLInputElement;
					field?.handleChange(target.value);
				}}
			/>
		{/snippet}
	</form.Field>
	<form.Field name="password">
		{#snippet children(field: AnyFieldApi)}
			<FormInput
				{field}
				required
				name={field.name}
				label="Password"
				inputId={field.name}
				type="password"
				autocomplete={mode === 'login' ? 'current-password' : 'new-password'}
				placeholder="passw@rd"
				value={field.state.value}
				oninput={(event: HtmlInputEvent) => {
					const target = event.currentTarget as HTMLInputElement;
					field?.handleChange(target.value);
				}}
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
			<Button type="submit" class="w-full cursor-pointer bg-rose-500 hover:bg-rose-600">
				{isLoading ? 'Loading...' : mode === 'login' ? 'Login' : 'Sign Up'}
			</Button>
		{/snippet}
	</form.Subscribe>
</form>
