<svelte:head>
  <title>YouGuess</title>
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
