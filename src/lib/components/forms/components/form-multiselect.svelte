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
		value: string[];
		selectId: string;
		placeholder: string;
		options: { value: string; label: string }[];
		customClass?: string;
		onValueChange: (value: string[]) => void;
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
		value.length ? options
      .filter((option) => value.includes(option.value))
      .map((option) => option.label)
      .join(", ") : placeholder
	);
</script>

<div class={customClass || 'relative mb-2 w-full'}>
	<Label for={forLabel} class="block text-sm font-medium text-gray-700">{label}</Label>
	<Select.Root {name} type="multiple" {onValueChange} bind:value>
		<Select.SelectTrigger id={selectId} class="w-full">
			{selectLabel}
		</Select.SelectTrigger>
		<Select.SelectContent>
			{#each options as option, i (i)}
				<Select.SelectItem value={option.value} label={option.label} class="capitalize">
					{option.label}
				</Select.SelectItem>
			{/each}
		</Select.SelectContent>
	</Select.Root>
	{#if field?.state.meta.errors}
		<FieldInfo {field} />
	{/if}
</div>
