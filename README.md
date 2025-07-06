# Ascent Knowledge Management

A modern knowledge management platform built with SvelteKit, Supabase, and Sanity.

---

## 🛠 Tech Stack

- **Frontend:** [SvelteKit](https://kit.svelte.dev/)
- **Database & Auth:** [Supabase](https://supabase.com/)
- **Content Management:** [Sanity.io](https://www.sanity.io/)
- **Deployment:** [Netlify](https://www.netlify.com/)
- **Styling:** Tailwind CSS
- **Other:** TypeScript, Vite

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
bun install
```

### 2. Run the main SvelteKit project

```bash
bun run dev
```
- The app will be available at [http://localhost:5173](http://localhost:5173) (or as shown in your terminal).

### 3. Run the Sanity Studio (CMS)

```bash
cd sanity
bun install
bun run dev
```
- The Sanity Studio will be available at [http://localhost:3333](http://localhost:3333) by default.

---

## 🌳 Branching System

- **main**: Production-ready code.
- **develop**: Latest development changes (merge feature branches here first).
- **feature/xyz**: Feature branches for new features or fixes.
- **hotfix/xyz**: Hotfix branches for urgent production fixes.

> Always branch from `develop` for new features and open PRs against `develop`.

---

## 📝 Project Structure

- `/src` - SvelteKit app source code
- `/sanity` - Sanity.io CMS project
- `/static` - Static assets
- `/supabase-schema.sql` - Database schema

---

## 🧑‍💻 Useful Commands

| Command                     | Description                  |
|-----------------------------|------------------------------|
| `bun run dev`               | Start SvelteKit dev server   |
| `bun run build`             | Build for production         |
| `bun run preview`           | Preview production build     |
| `bun run sanity`            | Start Sanity Studio          |

---

## 📖 Documentation

- [SvelteKit Docs](https://kit.svelte.dev/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Sanity Docs](https://www.sanity.io/docs)

---

## 🏗 Deploying to Netlify

This project is ready to deploy on [Netlify](https://www.netlify.com/) using the official SvelteKit Netlify adapter.

### Steps:

1. **Push your code to GitHub, GitLab, or Bitbucket.**
2. **Create a new site on Netlify** and link your repository.
3. **Set the build command and publish directory:**
   - **Build command:** `npm run build`
   - **Publish directory:** `.svelte-kit/netlify/edge` (for edge) or `build` (for standard)
   - Netlify will auto-detect these for most SvelteKit projects.
4. **Set environment variables**
5. **Deploy!**

### Notes
- The project uses `@sveltejs/adapter-netlify` (see `svelte.config.js`).
- For more details, see the [SvelteKit Netlify adapter docs](https://kit.svelte.dev/docs/adapter-netlify).
- If you use server-only environment variables, set them in Netlify's dashboard under Site settings > Environment variables.
