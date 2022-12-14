<script>
  import Toast from "./../General/Toast.svelte";
  import ModifyPrompt from "./ModifyPrompt.svelte";
  import Modal from "./../General/Modal.svelte";
  import {
    singleRandomPromptStore,
    promptStore,
    modifiedRandomPromptStore,
  } from "../../stores/promptStore.ts";
  import { userInformationStore } from "../../stores/loginStore.ts";
  import { addPromptResponse } from "../../services/DB/CRUD.ts";

  // A list of categories to choose from
  const promptCategories = [
    "School",
    "Work",
    "Love",
    "Family",
    "Friends",
    "Hobbies",
    "Travel",
    "Health",
    "Money",
    "Miscellaneous",
  ];

  let showModifyPromptModal = false;
  let showPromptSavedToast = false;
  let showPromptFailedToast = false;

  let promptData = {
    age: null,
    year: null,
    prompt: null,
    userResponse: null,
    positive: null,
    category: null,
    location: null,
  };

  const handleNew = () => {
    promptStore.update((data) => data);
  };

  const calculateAge = () => {
    let birthdate = $userInformationStore.birthdate.split("-");
    let year = promptData.year.split("-");
    promptData.age = `${Number(year[0]) - Number(birthdate[0])}`;
  };

  const calculateYear = () => {
    let birthdate = $userInformationStore.birthdate.split("-");
    let age = promptData.age;
    promptData.year = `${Number(birthdate[0]) + Number(age)}-${birthdate[1]}-${
      birthdate[2]
    }`;
  };

  const validateForm = () => {
    if (promptData.userResponse === null) {
      alert("Please enter a response.");
      return false;
    }
    if (promptData.positive === null) {
      alert("Please select a positive or negative response.");
      return false;
    }
    if (promptData.category === null) {
      alert("Please select a category.");
      return false;
    }
    if (promptData.location === null) {
      alert("Please select a location.");
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (validateForm()) {
      if ($modifiedRandomPromptStore) {
        promptData.prompt = $modifiedRandomPromptStore.prompt;
      } else {
        promptData.prompt = $singleRandomPromptStore.prompt;
      }
      addPromptResponse(promptData)
        .then(() => {
          promptData = {
            age: null,
            year: null,
            prompt: null,
            userResponse: null,
            positive: null,
            category: null,
            location: null,
          };
        })
        .catch((error) => {
          console.error(error);
        });
      showPromptSavedToast = true;
    } else {
      showPromptFailedToast = true;
    }
  };
</script>

{#if showPromptSavedToast}
  <Toast
    notification={"Your prompt has saved correctly."}
    on:closeToast={() => (showPromptSavedToast = false)}
  />
{/if}

{#if showPromptFailedToast}
  <Toast
    notification={"Your prompt has not saved correctly."}
    on:closeToast={() => (showPromptFailedToast = false)}
  />
{/if}

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
    <button on:click={handleNew}>Replace Prompt</button>
    <button on:click={handleSave}>Save</button>
  </section>
  <textarea
    placeholder="Around this time, I was keenly aware of..."
    bind:value={promptData.userResponse}
  />
  <section id="promptMetadata">
    <label
      ><input type="checkbox" bind:checked={promptData.positive} /> Positive experience
      if checked.</label
    >
    <label for="age">
      <input
        id="age"
        placeholder="Your age"
        type="number"
        on:change={calculateYear}
        bind:value={promptData.age}
      />
    </label>
    <label for="year"
      >Year:
      <input
        placeholder="The year"
        on:change={calculateAge}
        type="date"
        bind:value={promptData.year}
      />
    </label>
    <label for="location">
      Location:
      <input
        placeholder="location"
        id="location"
        type="location"
        bind:value={promptData.location}
      />
    </label>
    <label for="categoryDropdown">
      Select a category for this prompt.
      <select
        type="dropdown"
        id="categoryDropdown"
        bind:value={promptData.category}
      >
        {#each promptCategories as category}
          <option>{category}</option>
        {/each}
      </select>
    </label>
  </section>
</section>

<style>
  #promptMetadata {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
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
