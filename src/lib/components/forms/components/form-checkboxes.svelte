<script lang="ts">
	import type { AnyFieldApi } from '@tanstack/svelte-form';
	import { Checkbox } from '../../ui/checkbox';
	import { Label } from '../../ui/label';

	interface CheckboxProps {
		label: string;
		forLabel: string;
		wrapperClass: string;
		options: {value: string, label: string}[];
		field: AnyFieldApi;
	}

	const { label, forLabel, wrapperClass, options, field } = $props();
</script>

<div class={wrapperClass}>
	<Label class="mb-2" for={forLabel}>{label}</Label>
	{#each options as option, i (i)}
		<div class="flex items-center gap-2">
			<Checkbox
				checked={Array.isArray(field.state.value) && field.state.value.includes(option.value)}
				onchange={(e: Event) => {
					const checked = (e.target as HTMLInputElement).checked;
					let prefs = Array.isArray(field.state.value) ? [...field.state.value] : [];
					if (checked) {
						if (!prefs.includes(option.value)) prefs.push(option.value);
					} else {
						prefs = prefs.filter((v) => v !== option.value);
					}
					field.handleChange(prefs);
				}}
			/>
			<Label>{option.label}</Label>
		</div>
	{/each}
</div>
