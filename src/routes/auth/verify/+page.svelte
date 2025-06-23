<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabaseClient';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { Loader2 } from 'lucide-svelte';

  let isLoading = true;
  let error = '';
  let success = false;

  onMount(async () => {
    try {
      const token = $page.url.searchParams.get('token');
      const type = $page.url.searchParams.get('type');

      if (!token || type !== 'email_verification') {
        error = 'Invalid verification link';
        return;
      }

      const { error: verificationError } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'email'
      });

      if (verificationError) throw verificationError;
      success = true;

      // Redirect to home page after 3 seconds
      setTimeout(() => {
        goto('/');
      }, 3000);
    } catch (e) {
      if (e instanceof Error) {
        error = e.message;
      } else {
        error = 'An unexpected error occurred';
      }
    } finally {
      isLoading = false;
    }
  });
</script>

<div class="flex min-h-screen items-center justify-center">
  <div class="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg">
    <div class="text-center">
      <h2 class="text-3xl font-bold">Email Verification</h2>
    </div>

    {#if isLoading}
      <div class="flex justify-center">
        <Loader2 class="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    {:else if success}
      <div class="rounded-md bg-green-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-green-800">
              Email verified successfully! Redirecting to home page...
            </p>
          </div>
        </div>
      </div>
    {:else if error}
      <div class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>

      <div class="text-center">
        <a href="/auth" class="text-sm text-indigo-600 hover:text-indigo-500">
          Return to login
        </a>
      </div>
    {/if}
  </div>
</div> 