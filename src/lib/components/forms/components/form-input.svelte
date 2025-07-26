<script lang="ts">
	import type { AnyFieldApi } from '@tanstack/svelte-form';
	import type { FullAutoFill } from 'svelte/elements';
	import Input from '../../ui/input/input.svelte';
	import Label from '../../ui/label/label.svelte';
	import FieldInfo from './field-info.svelte';

	type Props = {
		accept?: string;
		field?: AnyFieldApi;
		name: string;
		label?: string;
		inputId: string;
		type: string;
		autocomplete?: FullAutoFill | null | undefined;
		placeholder?: string;
		required?: boolean;
		customClass?: string;
		value?: string;
		disabled?: boolean;
		oninput: any; //TODO change to the correct type
	};

	const {
		accept,
		field,
		label,
		inputId,
		type,
		autocomplete,
		placeholder,
		required,
		customClass,
		value,
		name,
		disabled,
		oninput
	}: Props = $props();
</script>

<div class="mb-2 w-full">
	<Label for="email" class="block text-sm font-medium text-gray-700">
		{label}
	</Label>
	<Input
		id={inputId}
		{accept}
		{name}
		{type}
		{autocomplete}
		{value}
		{placeholder}
		{required}
		{disabled}
		class={customClass ||
			'mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 focus:outline-none'}
		{oninput}
	/>
	{#if field?.state.meta.errors}
		<FieldInfo {field} />
	{/if}
</div>
