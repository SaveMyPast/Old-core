<script>
  import {
    promptStore,
    singleRandomPromptStore,
  } from "./../../stores/promptStore.js";
  import { onMount } from "svelte";
  import { getAllPrompts } from "../../services/DB/CRUD";

  onMount(() => {
    getAllPrompts();
  });
</script>

<section id="wrapper">
  {#if $singleRandomPromptStore}
    <h3>
      Answer this prompt in as much detail as you'd like. It's your history!
    </h3>
    <h2>{$singleRandomPromptStore.prompt}</h2>
  {:else}
    <h2>Loading prompt...</h2>
  {/if}
</section>

<style>
  #wrapper {
    width: 80%;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin: 1rem;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--dark-paperlike);
    border-radius: 0.33rem;
    padding: 1rem;
    box-shadow: -2px 5px 5px darkgrey;
  }

  h2,
  h3 {
    text-align: center;
  }
</style>
