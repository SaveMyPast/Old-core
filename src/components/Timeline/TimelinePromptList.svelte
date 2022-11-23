<script>
  import { userRespondedPromptStore } from "../../stores/promptStore";
  import { selectedPromptStore } from "./TimelineStore.js";

  const selectPrompt = (index) => {
    selectedPromptStore.set($userRespondedPromptStore[index]);
  };
</script>

{#if $userRespondedPromptStore}
  {#each $userRespondedPromptStore as entry, index}
    <section
      on:click={() => selectPrompt(index)}
      on:keydown={() => selectPrompt(index)}
    >
      <h3 class="promptYear">{entry.promptData.year}</h3>
      <h2 class="promptTitle">{entry.promptData.prompt}</h2>
      <p class="promptContent">{entry.promptData.userResponse}</p>
    </section>
  {:else}
    <section>
      <h2 class="promptTitle">There is nothing here...</h2>
      <p class="promptContent">You've not answered any prompts!</p>
    </section>
  {/each}
{/if}

<style>
  section {
    display: grid;
    grid-template-columns: 25% 37.5% 37.5%;
    grid-template-rows: 60% 40%;
    grid-template-areas:
      "title title title"
      "year content content"
      "year content content";
    background-color: var(--primary);
    border-bottom: 1px solid var(--dark-paperlike);
    width: 100%;
    height: 4rem;
  }

  section:active {
    background-color: var(--secondary);
  }

  .promptYear {
    grid-area: year;
    text-align: justify;
    color: var(--dark-paperlike);
  }

  .promptTitle {
    overflow: hidden;
    grid-area: title;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--dark-paperlike);
  }

  .promptContent {
    grid-area: content;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--dark-paperlike);
  }
</style>
