<script>
  import { createEventDispatcher } from "svelte";
  import {
    faChevronLeft,
    faFloppyDisk,
  } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa";
  import { updatePrompt } from "../../services/DB/CRUD";

  const dispatcher = createEventDispatcher();

  export let selectedPrompt = {
    age: null,
    goodMemory: null,
    prompt: null,
    userResponse: null,
    year: null,
    category: null,
    location: null,
  };

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

  let newPromptData = {
    age: null,
    goodMemory: null,
    prompt: null,
    userResponse: null,
    year: null,
    category: null,
    location: null,
  };

  const handleSave = () => {
    console.log(selectedPrompt);
    console.log(newPromptData);
    updatePrompt({ id: selectedPrompt.id, promptData: newPromptData });
  };

  const handleBackButton = () => {
    dispatcher("backButton");
  };
</script>

<section class="editWrapper">
  <section class="promptContainer">
    <span
      id="backButton"
      on:click={handleBackButton}
      on:keydown={handleBackButton}
    >
      <Fa icon={faChevronLeft} />
    </span>
    <h2 id="title">Edit Prompt</h2>
    <span id="saveIcon" on:click={handleSave} on:keydown={handleSave}>
      <Fa icon={faFloppyDisk} />
    </span>

    <label id="promptLabel" for="prompt">Prompt: {selectedPrompt.prompt}</label>
    <textarea
      id="promptTextarea"
      bind:value={newPromptData.prompt}
      placeholder={selectedPrompt.prompt}
    />
  </section>

  <section class="inputContainer">
    <label id="ageLabel" for="age">Age </label>
    <label id="yearLabel" for="year">Year</label>
    <input
      id="age"
      bind:value={newPromptData.age}
      placeholder={selectedPrompt.age}
    />
    <input
      id="year"
      bind:value={newPromptData.year}
      placeholder={selectedPrompt.year}
    />
    <select
      type="dropdown"
      id="categoryDropdown"
      bind:value={newPromptData.category}
    >
      {#each promptCategories as category}
        <option>{category}</option>
      {/each}
    </select>
    <input
      id="location"
      bind:value={newPromptData.location}
      placeholder={selectedPrompt.location}
    />
    <label id="categoryLabel" for="categoryDropdown"> Category </label>
    <label id="locationLabel" for="location">Location</label>
  </section>
  <section class="saveContainer">
    <input
      id="goodMemoryCheckbox"
      bind:checked={newPromptData.goodMemory}
      type="checkbox"
    />
    <label id="goodMemoryLabel" for="checked">Good Memory?</label>
    <span id="saveButton" on:click={handleSave} on:keydown={handleSave}>
      <Fa icon={faFloppyDisk} />
    </span>
  </section>
</section>

<style>
  .editWrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .promptContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }

  #backButton {
    flex: 0 1 10%;
    text-align: center;
  }

  #title {
    flex: 1 0 auto;
    text-align: center;
  }

  #saveIcon {
    flex: 0 1 10%;
    text-align: center;
  }

  #promptLabel {
    flex: 1 0 100%;
    text-align: center;
  }

  #promptTextarea {
    flex: 1 0 100%;
    height: 16rem;
    resize: none;
  }

  .inputContainer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 1rem;
    height: 100%;
  }

  .inputContainer > label {
    text-align: center;
  }

  #ageLabel {
    flex: 0 1 45%;
  }

  #age {
    flex: 0 1 45%;
    margin: 0.5rem;
  }

  #yearLabel {
    flex: 0 1 45%;
  }

  #year {
    flex: 0 1 45%;
    margin: 0.5rem;
  }

  #categoryDropdown {
    flex: 0 1 45%;
    background-color: var(--primary);
    margin: 0.5rem;
    border-radius: 0.33rem;
    border: none;
  }

  #location {
    flex: 0 1 45%;
    margin: 0.5rem;
  }

  #categoryLabel {
    flex: 0 1 45%;
  }

  #locationLabel {
    flex: 0 1 45%;
  }

  .saveContainer {
    justify-self: flex-end;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    padding: 1rem;
    height: 100%;
  }

  #goodMemoryCheckbox {
    flex: 0 1 15%;
    height: 1.5rem;
  }
  #goodMemoryLabel {
    flex: 0 1 35%;
    text-align: left;
  }

  #saveButton {
    flex: 0 1 15%;
    text-align: center;
    font-size: 1.5rem;
  }
</style>
