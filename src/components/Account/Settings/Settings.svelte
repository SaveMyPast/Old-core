<script lang="ts">
  import { deleteUserAccount } from "../../../services/Auth/login-service";
  import Modal from "./../../General/Modal.svelte";
  let deleteConfirm = false;
  let displayDeleteModal = false;

  const deleteAccount = () => {
    deleteUserAccount();
  };
</script>

{#if displayDeleteModal}
  <Modal
    closer={"deleteModal"}
    on:deleteModal={() => {
      displayDeleteModal = !displayDeleteModal;
    }}
    headerText={"Delete Account"}
  >
    <section class="modal-content">
      <h3 style:color={"var(--warn)"}>
        I understand that deleting my account is permanent and no one will be
        able to retrieve anything.
      </h3>
      <label for="deleteCheck">
        <input id="deleteCheck" type="checkbox" bind:checked={deleteConfirm} />
        Select to confirm</label
      >
      <button disabled={!deleteConfirm} on:click={deleteAccount}
        >Delete Account</button
      >
    </section>
  </Modal>
{/if}
<h1>There are currently no settings that can be changed.</h1>

<h2>Delete your account?</h2>
<button on:click={() => (displayDeleteModal = !displayDeleteModal)}
  >Delete Account</button
>

<style>
  .modal-content {
    display: grid;
    justify-items: center;
    align-items: center;
    grid-gap: 1rem;
    width: 100%;
  }
  h1 {
    margin: 1rem;
  }
</style>
