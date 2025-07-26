<script lang="ts">
	import * as Breadcrumb from '@/lib/components/ui/breadcrumb/index.js';

	const { breadcrumbs } = $props();
</script>

<Breadcrumb.Root>
	<Breadcrumb.List>
		<Breadcrumb.Item>
			<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
		</Breadcrumb.Item>
		{#each breadcrumbs as breadcrumb}
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				{#if breadcrumb.isLast}
					<Breadcrumb.Page>
						{breadcrumb.label}
					</Breadcrumb.Page>
				{:else}
					<Breadcrumb.Link href={breadcrumb.href}>
						{breadcrumb.label}
					</Breadcrumb.Link>
				{/if}
			</Breadcrumb.Item>
		{/each}
	</Breadcrumb.List>
</Breadcrumb.Root>
