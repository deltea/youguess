<svelte:head>
  <title>YouGuess</title>

  <meta name="title" content="YouGuess" />
  <meta name="description" content="Which YouTube video has more views?" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://youguess.vercel.app" />
  <meta property="og:title" content="YouGuess" />
  <meta property="og:description" content="Which YouTube video has more views?" />
  <meta property="og:image" content="/logo.png" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://youguess.vercel.app" />
  <meta property="twitter:title" content="YouGuess" />
  <meta property="twitter:description" content="Which YouTube video has more views?" />
  <meta property="twitter:image" content="/logo.png" />
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
