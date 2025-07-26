<script lang="ts">
	import { DatePicker } from 'bits-ui';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import Calendar from '@lucide/svelte/icons/calendar';
	import type { DateValue } from '@internationalized/date';

	interface Props {
		label: string;
		value?: DateValue;
		onValueChange?: (value: DateValue | undefined) => void;
	}

	let { label, value = $bindable(), onValueChange }: Props = $props();
</script>

<DatePicker.Root weekdayFormat="short" fixedWeeks={true} bind:value {onValueChange}>
	<div class="flex w-full flex-col gap-1.5">
		<DatePicker.Label class="block text-sm font-medium select-none">{label}</DatePicker.Label>
		<DatePicker.Input
			class="border-input text-foreground focus-within:border-ring focus-within:ring-ring/50 hover:border-ring/50 flex h-9 w-full items-center rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] select-none focus-within:ring-[3px]"
		>
			{#snippet children({ segments })}
				{#each segments as { part, value }, i (part + i)}
					<div class="inline-block select-none">
						{#if part === 'literal'}
							<DatePicker.Segment {part} class="text-muted-foreground p-1">
								{value}
							</DatePicker.Segment>
						{:else}
							<DatePicker.Segment
								{part}
								class="rounded-5px hover:bg-muted focus:bg-muted focus:text-foreground aria-[valuetext=Empty]:text-muted-foreground px-1 py-1 focus-visible:ring-0! focus-visible:ring-offset-0!"
							>
								{value}
							</DatePicker.Segment>
						{/if}
					</div>
				{/each}
				<DatePicker.Trigger
					class="text-foreground/60 hover:bg-muted active:bg-dark-10 ml-auto inline-flex size-8 items-center justify-center rounded-[5px] transition-all"
				>
					<Calendar class="size-6" />
				</DatePicker.Trigger>
			{/snippet}
		</DatePicker.Input>
		<DatePicker.Content sideOffset={6} class="z-50">
			<DatePicker.Calendar class="border-border bg-background rounded-lg border p-6 shadow-lg">
				{#snippet children({ months, weekdays })}
					<DatePicker.Header class="flex items-center justify-between">
						<DatePicker.PrevButton
							class="rounded-9px bg-background-alt hover:bg-muted inline-flex size-10 items-center justify-center transition-all active:scale-[0.98]"
						>
							<ChevronLeft class="size-6" />
						</DatePicker.PrevButton>
						<DatePicker.Heading class="text-[15px] font-medium" />
						<DatePicker.NextButton
							class="rounded-9px bg-background-alt hover:bg-muted inline-flex size-10 items-center justify-center transition-all active:scale-[0.98]"
						>
							<ChevronRight class="size-6" />
						</DatePicker.NextButton>
					</DatePicker.Header>
					<div class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-y-0 sm:space-x-4">
						{#each months as month (month.value)}
							<DatePicker.Grid class="w-full border-collapse space-y-1 select-none">
								<DatePicker.GridHead>
									<DatePicker.GridRow class="mb-1 flex w-full justify-between">
										{#each weekdays as day (day)}
											<DatePicker.HeadCell
												class="text-muted-foreground w-10 rounded-md text-xs font-normal!"
											>
												<div>{day.slice(0, 2)}</div>
											</DatePicker.HeadCell>
										{/each}
									</DatePicker.GridRow>
								</DatePicker.GridHead>
								<DatePicker.GridBody>
									{#each month.weeks as weekDates (weekDates)}
										<DatePicker.GridRow class="flex w-full">
											{#each weekDates as date (date)}
												<DatePicker.Cell
													{date}
													month={month.value}
													class="relative size-10 p-0! text-center text-sm"
												>
													<DatePicker.Day
														class="rounded-9px text-foreground hover:border-foreground data-selected:bg-foreground data-disabled:text-foreground/30 data-selected:text-background data-unavailable:text-muted-foreground group relative inline-flex size-10 items-center justify-center border border-transparent bg-transparent p-0 text-sm font-normal whitespace-nowrap transition-all data-disabled:pointer-events-none data-outside-month:pointer-events-none data-selected:font-medium data-unavailable:line-through"
													>
														<div
															class="bg-foreground group-data-selected:bg-background absolute top-[5px] hidden size-1 rounded-full transition-all group-data-today:block"
														></div>
														{date.day}
													</DatePicker.Day>
												</DatePicker.Cell>
											{/each}
										</DatePicker.GridRow>
									{/each}
								</DatePicker.GridBody>
							</DatePicker.Grid>
						{/each}
					</div>
				{/snippet}
			</DatePicker.Calendar>
		</DatePicker.Content>
	</div>
</DatePicker.Root>
