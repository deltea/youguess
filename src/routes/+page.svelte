<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  import IconTrophy from "~icons/gg/trophy";

  export let data: PageData;

  let username: string | null;
  let usernameInput: string;

  async function addUser() {
    if (!usernameInput) return;

    localStorage.setItem("username", usernameInput);
    username = usernameInput;

    await fetch("/api/new-user", {
      method: "POST",
      body: JSON.stringify({ username }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  onMount(() => {
    username = localStorage.getItem("username");
  });
</script>

<main class="bg-white h-full text-neutral">
  <section class="inline-flex flex-col justify-center items-center gap-8 h-full w-3/6">
    <div class="text-center space-y-4">
      <h1 class="text-6xl font-bold">
        You
        <span class="text-white bg-youtube px-2 rounded-2xl -ml-2">
          Guess
        </span>
      </h1>
      <h2 class="text-2xl">Which YouTube video has more views?</h2>
    </div>

    {#if username}
      <h1>Hello, {username}!</h1>
    {:else}
      <form class="flex flex-col items-stretch" on:submit|preventDefault={addUser}>
        <label for="username">Enter a username to join the leaderboard!</label>
        <input
          type="text"
          id="username"
          placeholder="Username..."
          bind:value={usernameInput}>
      </form>
    {/if}

    <a href="/play" class="bg-youtube text-white rounded-full px-16 p-2 uppercase text-xl btn">
      Let's Go!
    </a>
  </section>

  <section class="inline-flex flex-col justify-center h-full w-3/6 float-right p-8 gap-4">
    <h1 class="text-3xl">Leaderboard</h1>
    <ul class="bg-neutral rounded-lg w-full h-full">
      {#each data.leaderboard as leader, i}
        <li class="w-full flex odd:bg-youtube text-white p-2 px-4 justify-between rounded-lg">
          <div class="flex items-center gap-2">
            {#if i === 0}
              <div class="text-xl">
                <IconTrophy />
              </div>
            {/if}

            <h2 class="font-bold">
              {leader.name}
            </h2>
          </div>

          <h2>{leader.score}</h2>
        </li>
      {/each}
    </ul>
  </section>
</main>
