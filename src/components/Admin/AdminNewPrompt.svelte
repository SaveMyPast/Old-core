<script>
  import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa";
  import { adminAddNewPrompt } from "../../services/DB/CRUD";

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
    adminAddNewPrompt(newPromptData);
  };
</script>

<section class="container">
  <span id="prompt">
    <label for="promptTextarea" id="promptLabel">Prompt</label>
    <textarea id="promptTextarea" bind:value={newPromptData.prompt} />
  </span>
  <span>
    <label for="age" id="ageLabel">Age</label>
    <input id="age" bind:value={newPromptData.age} />
  </span>

  <span>
    <label for="dropdown" id="dropdownLabel">Category</label>
    <select
      type="dropdown"
      id="categoryDropdown"
      bind:value={newPromptData.category}
    >
      {#each promptCategories as category}
        <option>{category}</option>
      {/each}
    </select>
  </span>

  <span id="goodMemoryContainer">
    <label for="goodMemory">
      <input
        type="checkbox"
        id="goodMemory"
        bind:checked={newPromptData.goodMemory}
      />
      Good Memory</label
    >
  </span>

  <span id="saveButton" on:click={handleSave} on:keydown={handleSave}>
    <Fa icon={faFloppyDisk} />
  </span>
</section>

<style>
  .container {
    display: grid;
    height: 100%;
    grid-gap: 0.5rem;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 6rem 1fr 1fr;
    padding: 1rem;
  }

  .container > * {
    text-align: center;
  }

  #saveButton {
    justify-self: center;
    align-self: center;
    text-align: center;
    font-size: 1.5rem;
  }

  #categoryDropdown {
    background-color: var(--primary);
    border-radius: 0.33rem;
    border: none;
  }

  #prompt {
    grid-column: 1 / span 2;
    grid-row: 1 / 2;
  }

  #promptLabel {
    font-size: 1.5rem;
  }

  #promptTextarea {
    width: 100%;
    height: 4rem;
    resize: none;
  }
</style>
