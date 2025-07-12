<script lang="ts">
	import type { AnyFieldApi } from '@tanstack/svelte-form';
	import { Checkbox } from '../../ui/checkbox';
	import { Label } from '../../ui/label';
	import FieldInfo from './field-info.svelte';

	interface CheckboxProps {
		label: string;
		forLabel: string;
		wrapperClass: string;
		options: { value: string; label: string }[];
		field: AnyFieldApi;
		onChange: (optionValue: string, checked: boolean) => void;
	}

	const { label, forLabel, wrapperClass, options, field, onChange }: CheckboxProps = $props();
</script>

<div class={wrapperClass}>
	<Label class="mb-2" for={forLabel}>{label}</Label>
	{#each options as option (option.value)}
		<div class="flex items-center space-x-2">
			<Checkbox
				id={`${forLabel}-${option.value}`}
				checked={Array.isArray(field.state.value) && field.state.value.includes(option.value)}
				onCheckedChange={(checked) => onChange(option.value, checked as boolean)}
			/>
			<Label for={`${forLabel}-${option.value}`} class="text-sm font-normal">
				{option.label}
			</Label>
		</div>
	{/each}
	{#if field?.state.meta.errors}
		<FieldInfo {field} />
	{/if}
</div>
