<script lang="ts">
  let title = '';
  let description = '';
  let location_id = '';
  let error = '';
  let success = false;

  async function createEvent() {
    error = '';
    const res = await fetch('/api/events', {
      method: 'POST',
      body: JSON.stringify({ title, description, location_id }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) {
      error = await res.text();
    } else {
      success = true;
    }
  }
</script>

<form on:submit|preventDefault={createEvent}>
  <input bind:value={title} placeholder="Title" required />
  <textarea bind:value={description} placeholder="Description"></textarea>
  <input bind:value={location_id} placeholder="Location ID" />
  <button type="submit">Create Event</button>
</form>
{#if error}
  <p style="color: red">{error}</p>
{/if}
{#if success}
  <p>Event created!</p>
{/if} 