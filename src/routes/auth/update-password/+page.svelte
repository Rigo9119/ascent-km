<script lang="ts">
  import { supabase } from '$lib/supabaseClient';
  import { createForm } from '@tanstack/svelte-form';
  import { z } from 'zod';
  import Loader2  from '@lucide/svelte/icons/loader';
  import { goto } from '$app/navigation';

  const updateSchema = z.object({
    password: z.string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  });

  type UpdateValues = z.infer<typeof updateSchema>;

  let isLoading = false;
  let error = '';

  const form = createForm(() => ({
      defaultValues: {
        password: '',
        confirmPassword: ''
      },
      onSubmit: async (values) => {
        try {
          isLoading = true;
          error = '';       
          const { error: updateError } = await supabase.auth.updateUser({
            password: values.password
          });
          
          if (updateError) throw updateError;
          
          // Redirect to login page after successful password update
          goto('/auth?mode=login');
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
      validator: updateSchema
    }
  ));
</script>

<div class="flex min-h-screen items-center justify-center">
  <div class="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg">
    <div class="text-center">
      <h2 class="text-3xl font-bold">Update Password</h2>
      <p class="mt-2 text-sm text-gray-600">
        Enter your new password below.
      </p>
    </div>

    <form 
      onsubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        form.handleSubmit()
      }}
      class="mt-8 space-y-6"
    >
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          use:form.register={{ name: "password" }}
        />
        {#if $form.errors.password}
          <p class="mt-1 text-sm text-red-600">{$form.errors.password}</p>
        {/if}
      </div>

      <div>
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          use:form.register={{ name: "confirmPassword" }}
        />
        {#if $form.errors.confirmPassword}
          <p class="mt-1 text-sm text-red-600">{$form.errors.confirmPassword}</p>
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
          Update Password
        </button>
      </div>
    </form>

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
  </div>
</div> 