<script lang="ts">
  import { promptStore } from "../../stores/promptStore";
  import AdminPrompt from "./AdminPrompt.svelte";
  import { onMount } from "svelte";
  import { getAllPrompts } from "../../services/DB/CRUD";
  import AdminSelectedPromptEdit from "./AdminSelectedPromptEdit.svelte";

  let selectedPrompt = {
    id: null,
    age: null,
    goodMemory: null,
    prompt: null,
    userResponse: null,
    year: null,
    category: null,
    location: null,
  };

  const handleSelectedPrompt = (event) => {
    selectedPrompt = $promptStore[event.detail];
  };

  const handleBackButton = () => {
    resetSelectedPrompt();
  };

  const resetSelectedPrompt = () => {
    selectedPrompt = {
      id: null,
      age: null,
      goodMemory: null,
      prompt: null,
      userResponse: null,
      year: null,
      category: null,
      location: null,
    };
  };

  onMount(() => {
    getAllPrompts();
  });
</script>

<section class="promptList">
  {#if $promptStore}
    {#if !selectedPrompt.prompt}
      {#each $promptStore as prompt, index}
        <AdminPrompt
          on:selectPrompt={handleSelectedPrompt}
          {index}
          id={prompt.id}
          promptData={prompt}
        />
      {/each}
    {:else}
      <AdminSelectedPromptEdit
        {selectedPrompt}
        on:backButton={handleBackButton}
      />
    {/if}
  {/if}
</section>

<style>
  .promptList {
    display: grid;
    justify-content: center;
    max-height: 36rem;
  }
</style>
