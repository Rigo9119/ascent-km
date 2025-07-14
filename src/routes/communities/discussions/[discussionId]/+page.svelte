<script lang="ts">
  import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '$lib/components/ui/card';
  import Button from '@/lib/components/ui/button/button.svelte';
	import type { PageServerData } from '../$types';

  interface DiscussionPageData {
    discussionId: string
  }

  const { data }: { data: DiscussionPageData }  = $props() 
  const { discussionId } = data 
</script>

<div class="mx-auto max-w-3xl px-4 py-8"> 
  <Card class="mb-8">
    <CardHeader>
      <CardTitle>Discussion: {discussionId}</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="text-muted-foreground min-h-[40px] mb-6">
        <!-- TODO: Render discussion content here -->
        No content to show.
      </div>
    </CardContent>
  </Card>

  <Card class="mb-8">
    <CardHeader>
      <CardTitle>Replies</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="text-muted-foreground min-h-[40px] mb-6">
        <!-- TODO: Render replies/comments here -->
        No replies yet.
      </div>
    </CardContent>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle>Post a Reply</CardTitle>
    </CardHeader>
    <CardContent>
      <form class="flex flex-col gap-4">
        <textarea class="border rounded px-3 py-2 min-h-[80px]" placeholder="Write your reply..." disabled></textarea>
        <Button class="bg-rose-500 hover:bg-rose-600 w-fit" disabled>Post Reply</Button>
      </form>
    </CardContent>
  </Card>
</div> 