<script lang="ts">
	import { type AnyFieldApi, type AnyFormApi, type SvelteFormApi } from '@tanstack/svelte-form';
	import { Button } from '../../ui/button';
	import { Label } from '../../ui/label';
	import FormInput from './form-input.svelte';

	interface ArrayInputProps {
		field: AnyFieldApi;
		form: any;
		label: string;

		addButtonText: string;
		removeButtonText: string;
	}

	const { field, form, label, addButtonText, removeButtonText }: ArrayInputProps = $props();

	function addItem(fieldName: 'requirements' | 'highlights') {
		form.pushFieldValue(fieldName, '');
	}

	function removeItem(fieldName: 'requirements' | 'highlights', index: number) {
		form.removeFieldValue(fieldName, index);
	}
</script>

<div>
	<Label class="text-base font-medium" for={field.name}>{label}</Label>
	{#each field.state.value as item, index (index)}
		<div class="flex flex-row items-center justify-between gap-2">
			<form.Field name={`${field.name}[${index}]`}>
				{#snippet children(subfield: AnyFieldApi)}
					<FormInput
						name={subfield.name}
						inputId={subfield.name}
						type="text"
						placeholder={`${field.name} ${index + 1}`}
						value={item}
						oninput={(event: Event) => {
							const target = event.currentTarget as HTMLInputElement;
							subfield.handleChange(target.value);
						}}
					/>
					{#if field.state.value.length > 1}
						<Button
							type="button"
							variant="ghost"
							size="sm"
							onclick={() => removeItem(`${field.name}` as 'requirements' | 'highlights', index)}
							>{removeButtonText}</Button
						>
					{/if}
				{/snippet}
			</form.Field>
		</div>
	{/each}
	<Button
		onclick={() => addItem(`${field.name}` as 'requirements' | 'highlights')}
		type="button"
		class="cursor-pointer">{addButtonText}</Button
	>
</div>
