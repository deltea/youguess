<svelte:head>
  <title>YouGuess</title>

  <meta name="description" content="Which YouTube video has more views?">
  <meta name="keywords" content="YouTube, Guessing Game">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</svelte:head>

<script lang="ts">
  import { dev } from "$app/environment";
  import { inject } from "@vercel/analytics";

  import "../global.css";

  inject({ mode: dev ? "development" : "production" });
</script>

<div class="h-screen">
  <slot />
</div>
