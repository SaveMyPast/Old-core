<script>
  import ModifyPrompt from "./ModifyPrompt.svelte";
  import Modal from "./../General/Modal.svelte";
  import {
    singleRandomPromptStore,
    promptStore,
    modifiedRandomPromptStore,
  } from "./../../stores/promptStore.js";
  import { userInformationStore } from "../../stores/loginStore.js";
  import { addPromptResponse } from "../../services/DB/CRUD.js";

  let showModifyPromptModal = false;

  let promptData = {
    age: null,
    year: null,
    prompt: null,
    userResponse: null,
    positive: null,
  };

  const handleAdminNewPrompt = () => {};

  const handleNew = () => {
    promptStore.update((data) => data);
  };

  const handleSave = () => {
    if ($modifiedRandomPromptStore) {
      promptData.prompt = $modifiedRandomPromptStore.prompt;
    } else {
      promptData.prompt = $singleRandomPromptStore.prompt;
    }
    if (promptData.age == null) {
      promptData.age = $userInformationStore.birthdate - promptData.year;
    }

    if (promptData.year == null) {
      promptData.year = $userInformationStore.birthdate + promptData.age;
    }
    addPromptResponse(promptData);
  };
</script>

{#if showModifyPromptModal}
  <Modal
    headerText={"Modify Prompt"}
    closer={"closeModifyPromptModal"}
    on:closeModifyPromptModal={() => {
      showModifyPromptModal = false;
    }}><ModifyPrompt /></Modal
  >
{/if}

<section id="wrapper">
  <section id="actions">
    <button
      on:click={() => {
        showModifyPromptModal = true;
      }}>Modify Prompt</button
    >
    {#if $userInformationStore.isAdmin}
      <button on:click={handleAdminNewPrompt}>Create New Prompt</button>
    {/if}
    <button on:click={handleNew}>Replace Prompt</button>
    <button on:click={handleSave}>Save</button>
  </section>
  <textarea
    placeholder="Around this time, I was keenly aware of..."
    bind:value={promptData.userResponse}
  />
  <section id="promptMetadata">
    <label
      ><input type="checkbox" bind:checked={promptData.positive} /> Positive memory?</label
    >
    <input placeholder="Your age" bind:value={promptData.age} />
    <input placeholder="The year" bind:value={promptData.year} />
  </section>
</section>

<style>
  #promptMetadata {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  #actions {
    margin: 0;
  }
  #wrapper {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin: 1rem;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }

  #actions {
    align-self: flex-end;
  }

  textarea {
    width: 100%;
    height: 25rem;
    border-radius: 0.33rem;
    background-color: white;
    border: none;
    resize: none;
    outline: none;
  }
</style>
