<script lang="ts">
  import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '$lib/components/ui/card';
  import Button from '@/lib/components/ui/button/button.svelte';
  import { Separator } from '$lib/components/ui/separator';
  // import { Switch } from '$lib/components/ui/switch'; // If you have a switch/toggle component
  // import { user } from ... // get user data if needed
</script>

<div class="mx-auto max-w-2xl px-4 py-8">
  <h2 class="mb-6 text-2xl font-bold text-rose-600 sm:text-3xl">Settings</h2>

  <!-- Account Settings -->
  <Card class="mb-6">
    <CardHeader>
      <CardTitle>Account</CardTitle>
      <CardDescription>Manage your account details</CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      <div>
        <p class="font-semibold mb-1">Email</p>
        <p class="text-muted-foreground">user email</p>
        <Button variant="link" href="/settings/change-email">Change Email</Button>
      </div>
      <div>
        <Button variant="link" href="/settings/change-password">Change Password</Button>
      </div>
      <Separator />
      <div>
        <Button variant="destructive" href="/settings/delete-account">Delete Account</Button>
      </div>
    </CardContent>
  </Card>

  <!-- Preferences -->
  <Card class="mb-6">
    <CardHeader>
      <CardTitle>Preferences</CardTitle>
      <CardDescription>Customize your experience</CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      <div class="flex items-center justify-between">
        <span>Dark Mode</span>
        <!-- <Switch checked={darkMode} on:change={toggleDarkMode} /> -->
        <Button variant="outline" disabled>Coming soon</Button>
      </div>
      <div class="flex items-center justify-between">
        <span>Language</span>
        <Button variant="outline" disabled>Coming soon</Button>
      </div>
      <div class="flex items-center justify-between">
        <span>Notifications</span>
        <Button variant="outline" disabled>Coming soon</Button>
      </div>
    </CardContent>
  </Card>

  <!-- Privacy & Security -->
  <Card>
    <CardHeader>
      <CardTitle>Privacy & Security</CardTitle>
      <CardDescription>Control your privacy and security settings</CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      <div class="flex items-center justify-between">
        <span>Two-Factor Authentication</span>
        <Button variant="outline" disabled>Coming soon</Button>
      </div>
      <div class="flex items-center justify-between">
        <span>Connected Accounts</span>
        <Button variant="outline" disabled>Coming soon</Button>
      </div>
      <div>
        <Button variant="outline" disabled>Export My Data</Button>
      </div>
    </CardContent>
  </Card>
</div>