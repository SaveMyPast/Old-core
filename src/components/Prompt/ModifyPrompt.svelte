<script lang="ts">
  import { onMount } from "svelte";
  import {
    singleRandomPromptStore,
    modifiedRandomPromptStore,
  } from "../../stores/promptStore";

  let newPrompt;

  onMount(() => {
    modifiedRandomPromptStore.set($singleRandomPromptStore);
  });

  const onSave = () => {
    modifiedRandomPromptStore.update((promptData) => {
      let newPromptData = { ...promptData };
      newPromptData.prompt = newPrompt;
      return newPromptData;
    });
  };
</script>

<section class="wrapper">
  {#if $singleRandomPromptStore}
    {#if $modifiedRandomPromptStore}
      <h2 class="prompt">{$modifiedRandomPromptStore.prompt}</h2>
    {:else}
      <h2 class="prompt">{$singleRandomPromptStore.prompt}</h2>
    {/if}
    <input class="modifyPrompt" bind:value={newPrompt} />
    <button class="savePrompt" on:click={onSave}>Save</button>
  {:else}
    <h1 class="prompt">Loading...</h1>
  {/if}
</section>

<style>
  .wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 1rem;
  }

  .prompt {
    justify-self: center;
    max-width: none;
    grid-column: 1/5;
  }

  .modifyPrompt {
    grid-column: 1/5;
  }

  .savePrompt {
    justify-self: end;
  }
</style>
