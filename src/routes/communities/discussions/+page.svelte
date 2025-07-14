<script lang="ts">
  import { Card, CardHeader, CardTitle, CardContent } from '$lib/components/ui/card';
  import Button from '@/lib/components/ui/button/button.svelte';
  // Placeholder for future data fetching
</script>

<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
  <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
    <h2 class="font-bold text-rose-600 text-3xl md:text-4xl">Community Discussions</h2>
    <Button class="bg-rose-500 hover:bg-rose-600 w-full md:w-auto">+ New Discussion</Button>
  </div>

  <!-- Search/Filter Bar Placeholder -->
  <div class="mb-6">
    <input
      type="text"
      placeholder="Search discussions..."
      class="w-full max-w-md border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
      disabled
    />
  </div>

  <Card>
    <CardHeader>
      <CardTitle>All Discussions</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="text-muted-foreground min-h-[40px]">
        <!-- TODO: Render list of discussions here -->
        No discussions to show.
      </div>
    </CardContent>
  </Card>
</div> 