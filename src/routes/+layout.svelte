<svelte:head>
  <title>YouGuess</title>

  <meta name="description" content="Which YouTube video has more views?">
  <meta name="keywords" content="YouTube, Guessing Game">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <meta property="og:title" content="YouGuess">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://youguess.vercel.app">
  <meta property="og:image" content="/logo.png">
  <meta property="og:description" content="Which YouTube video has more views?">
  <meta name="theme-color" content="#FF0000">

  <meta name="twitter:card" content="summary_large_image">
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
