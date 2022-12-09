<script>
  import AdminPromptPanel from "./AdminPromptPanel.svelte";
  import Modal from "../General/Modal.svelte";
  import AdminNewPrompt from "./AdminNewPrompt.svelte";

  let showCreateNewPromptModal = false;
</script>

{#if showCreateNewPromptModal}
  <Modal
    on:closeNewPrompt={() => {
      showCreateNewPromptModal = false;
    }}
    closer={"closeNewPrompt"}
    headerText={"Create New Prompt"}
  >
    <AdminNewPrompt />
  </Modal>
{/if}

<h1>User Administration</h1>

<section class="container">
  <section class="titleContainer">
    <h2 class="title">Prompts</h2>
  </section>
  <section class="panelContent"><AdminPromptPanel /></section>
  <section class="newPrompt">
    <button
      on:click={() => {
        showCreateNewPromptModal = true;
      }}>New Prompt</button
    >
  </section>
  <section class="titleContainer">
    <h2 class="title">Users</h2>
  </section>
  <section class="panelContent"><!--<AdminUsersPanel/>--></section>
  <section class="newUser"><button>New User</button></section>
</section>

<style>
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 2rem 35rem 2rem;
    grid-auto-flow: column;
    grid-gap: 1rem;
    margin: 1rem;
  }

  .title {
    justify-self: center;
    text-align: center;
  }

  .panelContent {
    border: 1px solid var(--dark-paperlike);
    border-radius: 0.33rem;
    background-color: var(--paperlike);
  }

  .newPrompt {
    justify-self: center;
    text-align: center;
  }

  .newUser {
    justify-self: center;
    text-align: center;
  }
</style>
