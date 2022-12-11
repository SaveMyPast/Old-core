<script>
  import { createEventDispatcher } from "svelte";

  export let index;
  export let id;
  export let promptData = [
    {
      age: null,
      goodMemory: null,
      prompt: null,
      userResponse: null,
      year: null,
      category: null,
      location: null,
    },
  ];

  const dispatcher = createEventDispatcher();
  const selectPrompt = () => {
    dispatcher("selectPrompt", index);
  };
</script>

<section class="container" on:click={selectPrompt} on:keydown={selectPrompt}>
  <h2>ID: {id}</h2>
  <p class="prompt">{promptData.prompt}</p>
</section>

<style>
  .container {
    padding: 0.5rem;
    border-bottom: 1px solid var(--dark-paperlike);
    height: 3.5rem;
  }

  .prompt {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 45ch;
  }

  h2 {
    text-align: center;
  }
</style>
