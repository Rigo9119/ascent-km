<script lang="ts">
  import { supabase } from '$lib/supabaseClient';
  import { createForm } from '@tanstack/svelte-form-core';
  import { zodValidator } from '@tanstack/zod-form-adapter';
  import { z } from 'zod';
  import { Loader2 } from 'lucide-svelte';

  const resetSchema = z.object({
    email: z.string().email('Please enter a valid email')
  });

  type ResetValues = z.infer<typeof resetSchema>;

  let isLoading = false;
  let error = '';
  let success = false;

  const form = createForm<ResetValues>({
    defaultValues: {
      email: ''
    },
    onSubmit: async (values) => {
      try {
        isLoading = true;
        error = '';
        
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(values.email, {
          redirectTo: `${window.location.origin}/auth/update-password`
        });
        
        if (resetError) throw resetError;
        success = true;
      } catch (e) {
        if (e instanceof Error) {
          error = e.message;
        } else {
          error = 'An unexpected error occurred';
        }
      } finally {
        isLoading = false;
      }
    },
    validator: zodValidator(resetSchema)
  });
</script>

<div class="flex min-h-screen items-center justify-center">
  <div class="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg">
    <div class="text-center">
      <h2 class="text-3xl font-bold">Reset Password</h2>
      <p class="mt-2 text-sm text-gray-600">
        Enter your email address and we'll send you a link to reset your password.
      </p>
    </div>

    {#if !success}
      <form use:form class="mt-8 space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            use:form.register={{ name: "email" }}
          />
          {#if $form.errors.email}
            <p class="mt-1 text-sm text-red-600">{$form.errors.email}</p>
          {/if}
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            class="group relative flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {#if isLoading}
              <Loader2 class="mr-2 h-4 w-4 animate-spin" />
            {/if}
            Send Reset Link
          </button>
        </div>
      </form>
    {:else}
      <div class="rounded-md bg-green-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-green-800">
              Check your email for a password reset link.
            </p>
          </div>
        </div>
      </div>
    {/if}

    {#if error}
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
    {/if}

    <div class="text-center">
      <a href="/auth" class="text-sm text-indigo-600 hover:text-indigo-500">
        Back to login
      </a>
    </div>
  </div>
</div> 