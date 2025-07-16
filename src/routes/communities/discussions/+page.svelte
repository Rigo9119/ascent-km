<script lang="ts">
  import { Card, CardHeader, CardTitle, CardContent } from '$lib/components/ui/card';
  import Button from '@/lib/components/ui/button/button.svelte';
  // Placeholder for future data fetching

  // Mock discussions data
  const discussions = [
    {
      id: '1',
      title: 'How to find housing in Seoul?',
      text: 'Share your tips and experiences for finding housing as a foreigner in Seoul.',
      replies: 12
    },
    {
      id: '2',
      title: 'Best places to eat Korean BBQ',
      text: 'Let’s compile a list of the best Korean BBQ spots in the city!',
      replies: 8
    },
    {
      id: '3',
      title: 'Tips for learning Korean fast',
      text: 'What resources or methods helped you learn Korean quickly?',
      replies: 15
    },
    {
      id: '4',
      title: 'Making friends as an expat',
      text: 'How do you meet new people and make friends in Korea?',
      replies: 5
    }
  ];
</script>

<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
  <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
    <h2 class="font-bold text-emerald-600 text-3xl md:text-4xl">Community Discussions</h2>
    <Button class="bg-emerald-500 hover:bg-emerald-600 w-full md:w-auto">+ New Discussion</Button>
  </div>

  <!-- Search/Filter Bar Placeholder -->
  <div class="mb-6">
    <input
      type="text"
      placeholder="Search discussions..."
      class="w-full max-w-md border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
      disabled
    />
  </div>

  <Card>
    <CardHeader>
      <CardTitle>All Discussions</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="text-muted-foreground min-h-[40px]">
        {#if discussions.length === 0}
          No discussions to show.
        {:else}
          <ul class="divide-y divide-gray-200">
            {#each discussions as discussion}
              <li class="py-4">
                <a href={`/communities/discussions/${discussion.id}`} class="block hover:bg-emerald-50 rounded-lg px-2 py-2 transition">
                  <div class="flex items-center justify-between">
                    <h3 class="font-semibold text-lg text-emerald-700">{discussion.title}</h3>
                    <span class="text-xs text-gray-500">{discussion.replies} replies</span>
                  </div>
                  <div class="text-sm text-gray-700 mt-1 line-clamp-2">{discussion.text}</div>
                </a>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    </CardContent>
  </Card>
</div> 