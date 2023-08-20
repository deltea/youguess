<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { scale, slide } from "svelte/transition";

  import IconSpinner from "~icons/gg/spinner-alt";
  import IconMore from "~icons/gg/trending";
  import IconLess from "~icons/gg/trending-down";
  import IconCorrect from "~icons/gg/check";
  import IconWrong from "~icons/gg/close";

  const delay = 1500;

  let video1: any = null;
  let video2: any = null;

  let game: "loading" | "playing" | "over" = "loading";
  let state: "choosing" | "correct" | "incorrect" = "choosing";
  let score = 0;

  async function setVideos() {
    video1 = null;
    video2 = null;
    game = "loading"

    video1 = await fetchVideo();
    video2 = await fetchVideo();

    game = "playing";
  }

  async function fetchVideo() {
    const response = await fetch("/api/random-video", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const result = await response.json();

    console.log("Results: ", result);
    return result;
  }

  function wrong() {
    state = "incorrect";

    setTimeout(() => {
      game = "over";
    }, delay);
  }

  async function correct() {
    state = "correct";
    score++;

    setTimeout(async () => {
      game = "loading"

      video1 = video2;
      video2 = await fetchVideo();

      state = "choosing";
      game = "playing";
    }, delay);
  }

  async function choose(choice: -1 | 1) {
    console.log(video1.views, video2.views);
    if (choice === 1) {
      console.log("Choice: More");
      if (Number(video2.views) > Number(video1.views)) {
        correct();
      } else {
        wrong();
      }
    } else {
      console.log("Choice: Less");
      if (Number(video2.views) < Number(video1.views)) {
        correct();
      } else {
        wrong();
      }
    }
  }

  onMount(() => {
    setVideos();
  });
</script>

{#if game === "loading"}
  <main class="flex flex-col gap-4 justify-center items-center h-full bg-youtube text-white" transition:slide>
    <div class="flex gap-4 items-center">
      <h1 class="text-4xl">Loading videos</h1>
      <IconSpinner class="animate-spin text-4xl" />
    </div>
    <p class="block text-lg">Hang tight...</p>
  </main>
{:else if game === "over"}
  <main class="flex flex-col gap-4 justify-center items-center h-full bg-neutral text-white" transition:slide>
    <h1 class="text-4xl">Game Over!</h1>
    <h2 class="text-2xl">Your score: <span class="text-youtube">{score}</span></h2>

    <div class="space-x-4">
      <a class="bg-white text-neutral rounded-full px-8 p-2 uppercase text-xl" href="/">Go to menu</a>
      <button class="bg-youtube text-white rounded-full px-8 p-2 uppercase text-xl" on:click={() => location.href = "/play"}>Play again?</button>
    </div>
  </main>
{:else}
  <main class="h-full flex relative" transition:slide>
    {#if video1}
      <div class="bg-cover bg-center h-full w-1/2 inline-flex justify-center items-center text-white text-center bg-gray-500 bg-blend-multiply"
        style:background-image="url('{video1.thumbnails.high.url}')">
        <h1 class="text-xl w-2/3">
          The YouTube video
          <span class="text-4xl block">"{video1.title}"</span>
          has
          <span class="text-5xl block text-youtube">{video1.views}</span>
          total views
        </h1>
      </div>
    {/if}

    {#if state === "choosing"}
      <div class="bg-youtube text-white p-8 text-4xl rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center" transition:scale>
        VS
      </div>
    {:else if state === "correct"}
      <div class="bg-green-500 text-white p-8 text-4xl rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center" transition:scale>
        <IconCorrect />
      </div>
    {:else}
      <div class="bg-neutral text-white p-8 text-4xl rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center" transition:scale>
        <IconWrong />
      </div>
    {/if}

    {#if video2}
      <div class="bg-cover bg-center h-full w-1/2 inline-flex justify-center items-center text-white text-center bg-gray-500 bg-blend-multiply"
        style:background-image="url('{video2.thumbnails.high.url}')">
        <h1 class="text-xl w-2/3">
          The YouTube video
          <span class="text-4xl block">"{video2.title}"</span>
          has
          <span class="text-xl text-youtube flex flex-col my-4 gap-1">
            {#if state === "choosing"}
              <button class="uppercase bg-youtube text-white rounded-full py-2" on:click={() => choose(1)}>
                More
                <IconMore class="inline ml-2" />
              </button>
              <button class="uppercase bg-neutral text-white rounded-full py-2" on:click={() => choose(-1)}>
                Less
                <IconLess class="inline ml-2" />
              </button>
            {/if}
            {#if state !== "choosing"}
              <h1 id="countUp" class="text-5xl text-youtube">{video2.views}</h1>
            {/if}
          </span>
          views than {video1.title}
        </h1>
      </div>
    {/if}

    <p class="absolute left-4 bottom-4 text-white text-xl">Score: {score}</p>
  </main>
{/if}
