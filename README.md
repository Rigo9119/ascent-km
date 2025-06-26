# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Deploying to Netlify

This project is ready to deploy on [Netlify](https://www.netlify.com/) using the official SvelteKit Netlify adapter.

### Steps:

1. **Push your code to GitHub, GitLab, or Bitbucket.**
2. **Create a new site on Netlify** and link your repository.
3. **Set the build command and publish directory:**
   - **Build command:** `npm run build`
   - **Publish directory:** `.svelte-kit/netlify/edge` (for edge) or `build` (for standard)
   - Netlify will auto-detect these for most SvelteKit projects.
4. **Set environment variables** (e.g., for Supabase):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_GOOGLE_MAPS_API_KEY`
   - Add any other variables your app needs.
5. **Deploy!**

### Notes
- The project uses `@sveltejs/adapter-netlify` (see `svelte.config.js`).
- For more details, see the [SvelteKit Netlify adapter docs](https://kit.svelte.dev/docs/adapter-netlify).
- If you use server-only environment variables, set them in Netlify's dashboard under Site settings > Environment variables.
