<script lang="ts">
	import { Label } from '../../ui/label';
	import { Textarea } from '../../ui/textarea';

	interface TextAreaProps {
		id: string;
		forLabel: string;
		label: string;
		name: string;
		placeholder: string;
		value: string;
		oninput: (event: Event) => void;
		onblur: () => void;
		rows: number;
		maxlength: number;
	}

	const {
		id,
		forLabel,
		label,
		name,
		placeholder,
		value,
		oninput,
		onblur,
		rows,
		maxlength
	}: TextAreaProps = $props();
</script>

<div>
	<Label for={forLabel} class="mb-1 block text-sm font-medium text-gray-700">{label}</Label>
	<Textarea
		{id}
		{name}
		{placeholder}
		{value}
		{oninput}
		{onblur}
		{rows}
		{maxlength}
		class="w-full resize-none"
	/>
	<div class="mt-1 text-right text-xs text-gray-500">{value.length || 0}/{maxlength}</div>
</div>
