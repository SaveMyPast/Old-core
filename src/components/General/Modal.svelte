<script>
  import { createEventDispatcher } from "svelte";

  export let headerText;
  export let closer;

  const dispatcher = createEventDispatcher();

  const closeModal = () => {
    dispatcher(`${closer}`);
  };
</script>

<!-- 
    @component
    Creates a modal that displays over the entire page. 

    Accepts:

    Header string

    a component: e.g. `<SomeComponent />`

    Custom Event: will be fired when closeModal is triggered

    Usage: 

    `<Modal headerText={"Login Window"} closer={closeModal} on:closeModal={() => {seeModal = false}}> <SomeComponent /> </Modal`

 -->

<section class="background" on:keydown={closeModal} on:click={closeModal} />
<section class="card">
  <section class="header" />
  <h2 class="title">{headerText}</h2>
  <span class="closeButton" on:keydown={closeModal} on:click={closeModal}
    >X</span
  >
  <section class="content">
    <slot>
      <h2 style:color="var(--warn)">
        This modal has failed to load properly. Click away to close.
      </h2>
    </slot>
  </section>
</section>

<style>
  .title {
    grid-area: header;
  }
  .background {
    background-color: grey;
    opacity: 50%;
    position: fixed;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(1rem);
    z-index: 1;
  }

  .card {
    top: 50%;
    left: 50%;
    margin-top: -10rem; /* Negative half of height. */
    margin-left: -15rem;
    height: 20rem;
    width: 30rem;
    opacity: 100%;
    border: 1px solid var(--dark-paperlike);
    border-radius: 0.33rem;
    z-index: 1;
    position: fixed;
    background-color: white;
    display: grid;
    grid-template-areas:
      "empty header header header header close"
      "content content content content content content"
      "content content content content content content"
      "content content content content content content"
      "content content content content content content"
      "footer footer footer footer footer footer";
    grid-template-columns: 2.5rem repeat(4, 6.25rem) 2.5rem;
    grid-template-rows: 2rem repeat(4, 4rem) 2rem;
  }

  .header {
    grid-area: header;
    justify-items: end;
  }

  .content {
    grid-area: content;
  }

  .closeButton {
    min-width: none;
    max-width: none;
    max-height: none;
    max-height: none;
    grid-area: close;
    justify-self: center;
    align-self: center;
    background-color: none;
    color: var(--dark-paperlike);
  }
</style>
