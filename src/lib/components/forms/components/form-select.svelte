<script lang="ts">
	import Label from '../../ui/label/label.svelte';
	import * as Select from '../../ui/select';

	interface SelectProps {
		forLabel: string;
		label: string;
		name: string;
		value: string;
		selectId: string;
		placeholder: string;
		options: { value: string; label: string }[];
		customClass?: string;
	}

	let {
		forLabel,
		label,
		name,
		value = $bindable(),
		selectId,
		placeholder,
		options,
		customClass
	}: SelectProps = $props();
</script>

<div class={customClass}>
	<Label class="text-sm font-medium" for={forLabel}>{label}</Label>
	<Select.Root type='single' {name} bind:value>
		<Select.SelectTrigger id={selectId} class="w-full">
			{placeholder}
		</Select.SelectTrigger>
		<Select.SelectContent>
			<Select.SelectItem value="all">All locations</Select.SelectItem>
			{#each options as option (option.value)}
				<Select.SelectItem value={option.value} label={option.label}
					>{option.label}</Select.SelectItem
				>
			{/each}
		</Select.SelectContent>
	</Select.Root>
</div>
