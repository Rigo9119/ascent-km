<script lang="ts">
  import Input from '../../ui/input/input.svelte';
  import Label from '../../ui/label/label.svelte';
  import { createEventDispatcher, onMount } from 'svelte';

  export let label: string;
  export let name: string;
  export let value: string[] = [];
  export let options: { value: string; label: string }[] = [];
  export let onChange: (selected: string[]) => void = () => {};

  let open = false;
  let dropdownRef: HTMLDivElement;
  const dispatch = createEventDispatcher();

  function handleClickOutside(event: MouseEvent) {
    if (open && dropdownRef && !dropdownRef.contains(event.target as Node)) {
      open = false;
    }
  }

  onMount(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  function toggleOption(optionValue: string) {
    let newValue: string[];
    if (value.includes(optionValue)) {
      newValue = value.filter((v) => v !== optionValue);
    } else {
      newValue = [...value, optionValue];
    }
    onChange(newValue);
    dispatch('change', newValue);
  }

  $: selectedLabels = options.filter(o => value.includes(o.value)).map(o => o.label);
</script>

<div class="mb-2 w-full relative">
  <Label for={name} class="block text-sm font-medium text-gray-700">{label}</Label>
  <div class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm bg-white cursor-pointer focus:border-rose-500 focus:ring-rose-500 focus:outline-none" tabindex="0" onclick={() => open = !open}>
    {#if selectedLabels.length > 0}
      <span>{selectedLabels.join(', ')}</span>
    {:else}
      <span class="text-gray-400">Select...</span>
    {/if}
  </div>
  {#if open}
    <div bind:this={dropdownRef} class="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
      {#each options as option}
        <label class="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer">
          <Input type="checkbox" checked={value.includes(option.value)} onchange={() => toggleOption(option.value)} />
          <span class="ml-2">{option.label}</span>
        </label>
      {/each}
    </div>
  {/if}
</div> 