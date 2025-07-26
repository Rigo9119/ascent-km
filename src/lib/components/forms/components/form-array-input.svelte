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
		placeholder?: string;
	}

	const { field, form, label, addButtonText, removeButtonText, placeholder }: ArrayInputProps = $props();

	function addItem() {
		form.pushFieldValue(field.name, '');
	}

	function removeItem(index: number) {
		form.removeFieldValue(field.name, index);
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
						placeholder={placeholder || `${field.name} ${index + 1}`}
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
							onclick={() => removeItem(index)}
							>{removeButtonText}</Button
						>
					{/if}
				{/snippet}
			</form.Field>
		</div>
	{/each}
	<Button
		onclick={() => addItem()}
		type="button"
		class="cursor-pointer">{addButtonText}</Button
	>
</div>
