<script lang="ts">
	import type { AnyFieldApi } from '@tanstack/svelte-form';
	import Label from '../../ui/label/label.svelte';
	import * as Select from '../../ui/select';
	import FieldInfo from './field-info.svelte';

	interface SelectProps {
		field?: AnyFieldApi;
		forLabel: string;
		label: string;
		name: string;
		value: string;
		selectId: string;
		placeholder: string;
		options: { value: string; label: string }[];
		customClass?: string;
		onValueChange: (value: string) => void;
	}

	let {
		field,
		forLabel,
		label,
		name,
		value = $bindable(),
		selectId,
		placeholder,
		options,
		customClass,
		onValueChange
	}: SelectProps = $props();

	const selectLabel = $derived(
		value ? options.find((option) => option.value === value)?.label : placeholder
	);
</script>

<div class={customClass}>
	<Label class="text-sm font-medium" for={forLabel}>{label}</Label>
	<Select.Root {name} type="single" {onValueChange} bind:value>
		<Select.SelectTrigger id={selectId} class="w-full">
			{selectLabel}
		</Select.SelectTrigger>
		<Select.SelectContent>
			{#each options as option, i (i)}
				<Select.SelectItem class="capitalize" value={option.value} label={option.label}>
					{option.label}
				</Select.SelectItem>
			{/each}
		</Select.SelectContent>
	</Select.Root>
	{#if field?.state.meta.errors}
		<FieldInfo {field} />
	{/if}
</div>
