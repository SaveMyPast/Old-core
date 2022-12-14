<script lang="ts">
  import {
    modifiedRandomPromptStore,
    singleRandomPromptStore,
  } from "../../stores/promptStore";
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
    {#if $modifiedRandomPromptStore}
      <h2>{$modifiedRandomPromptStore.prompt}</h2>
    {:else}
      <h2>{$singleRandomPromptStore.prompt}</h2>
    {/if}
  {:else}
    <h2>Loading prompt...</h2>
  {/if}
</section>

<style>
  #wrapper {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin: 1rem;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }

  h2,
  h3 {
    text-align: center;
  }
</style>
