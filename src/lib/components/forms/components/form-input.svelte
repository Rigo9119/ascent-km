<script lang="ts">
	import type { AnyFieldApi } from "@tanstack/svelte-form";
	import type { FullAutoFill } from "svelte/elements";
	import Input from "../../ui/input/input.svelte";
	import Label from "../../ui/label/label.svelte";
	import FieldInfo from "./field-info.svelte";

  type Props = {
    field: AnyFieldApi,
    name: string ,
    label: string,
    inputId: string,
    type: string,
    autocomplete?: FullAutoFill | null | undefined,
    placeholder?: string
    required?: boolean
  }

  const { field, label, inputId, type, autocomplete, placeholder, required }: Props = $props()
</script>

<div class='mb-2 w-full'>
    <Label for="email" class="block text-sm font-medium text-gray-700">
      {label}
    </Label>
    <Input
      id={inputId}
      name={field.name}
      type={type}
      autocomplete={autocomplete}
      value={field.state.value}
      placeholder={placeholder}
      {required}
      class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
      oninput={(event) => {
        const target = event.target as HTMLInputElement
        field.handleChange(target.value)
      }}
    />
    <FieldInfo {field} />
</div>