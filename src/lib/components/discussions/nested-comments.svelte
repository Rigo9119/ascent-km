<script lang="ts">
  import NestedComments from './nested-comments.svelte';
  import { onMount } from 'svelte';
  export let comments: Array<any> = [];
  export let level: number = 0;

  // Indent Rainbow colors (customize as needed)
  const colors = [
    '#ffb3ba', // Level 0
    '#ffdfba', // Level 1
    '#ffffba', // Level 2
    '#baffc9', // Level 3
    '#bae1ff', // Level 4
    '#d5baff', // Level 5
    '#ffbafc', // Level 6
  ];

  // Track which comment is replying
  let replying: Record<number, boolean> = {};

  function toggleReply(id: number) {
    replying[id] = !replying[id];
  }
</script>

<ul class="nested-comments">
  {#each comments as comment}
    <li class="comment-item" style="border-left: 4px solid {colors[level % colors.length]}; padding-left: 1rem; margin-bottom: 1rem;">
      <div class="flex items-center gap-2 mb-1">
        <span class="font-semibold">{comment.author}</span>
        <span class="text-xs text-gray-500">• {comment.date || '2024-06-01'}</span>
      </div>
      <div class="mb-2">{comment.text}</div>
      <div class="flex items-center gap-3 mb-2">
        <button class="like-btn" aria-label="Like"><span>👍</span> {comment.likes ?? 0}</button>
        <button class="dislike-btn" aria-label="Dislike"><span>👎</span> {comment.dislikes ?? 0}</button>
        <button class="reply-btn" on:click={() => toggleReply(comment.id)} aria-label="Reply">Reply</button>
      </div>
      {#if replying[comment.id]}
        <div class="mb-2 pr-2">
          <textarea class="border rounded px-2 py-1 w-full min-h-[40px]" placeholder="Write your reply..."></textarea>
          <div class="flex gap-2 mt-1">
            <button class="send-btn" disabled>Send</button>
            <button class="cancel-btn" type="button" on:click={() => toggleReply(comment.id)}>Cancel</button>
          </div>
        </div>
      {/if}
      {#if comment.replies && comment.replies.length > 0}
        <NestedComments comments={comment.replies} level={level + 1} />
      {/if}
    </li>
  {/each}
</ul>

<style>
.nested-comments {
  list-style: none;
  margin: 0;
  padding: 0;
}
.comment-item {
  background: rgba(250,250,250,0.7);
  border-radius: 0.5rem;
  transition: background 0.2s;
  margin-bottom: 1rem;
}
.like-btn, .dislike-btn, .reply-btn, .send-btn, .cancel-btn {
  background: none;
  border: none;
  color: #d9465a;
  cursor: pointer;
  font-size: 0.95em;
  padding: 2px 8px;
  border-radius: 4px;
  transition: background 0.15s;
}
.like-btn:hover, .dislike-btn:hover, .reply-btn:hover, .send-btn:hover, .cancel-btn:hover {
  background: #ffe4e6;
}
.send-btn {
  color: #fff;
  background: #d9465a;
  padding: 2px 12px;
}
.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.cancel-btn {
  color: #555;
  background: #f3f4f6;
}
</style> 