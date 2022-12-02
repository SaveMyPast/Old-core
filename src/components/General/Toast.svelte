<script>
  import { onMount, createEventDispatcher } from "svelte";
  import Fa from "svelte-fa";
  import {
    faCircleExclamation,
    faCircleCheck,
    faXmark,
  } from "@fortawesome/free-solid-svg-icons";
  import { fade } from "svelte/transition";
  const dispatcher = createEventDispatcher();

  export let seconds = 5;
  export let notification = "Whoops, something went wrong.";
  export let warning = false;

  const emitClose = (seconds) => {
    console.log("starting countdown");
    setTimeout(() => {
      dispatcher("closeToast");
      console.log("Emitting close event");
    }, seconds * 1000);
  };

  const closeNow = () => {
    dispatcher("closeToast");
  };

  onMount(() => {
    emitClose(seconds);
  });
</script>

<!-- 
*   @component
*   A toast modal for displaying temporary messages, will emit an event after a set number of seconds, default 5
*   
*   Accepts the following parameters: 

*   `seconds` - number of seconds to display before closing the toast.

*   `notification` - notification to display in the toast.

*   `warning` - if true, the toast will display as a warning.

*   usage: 
*   `<Toast seconds="5" notification="That didn't work" on:closeToast={() => showWarningToast = false} warning />`
 -->

<section out:fade class="toast-card">
  {#if warning}
    <span class="icon warning-icon">
      <Fa icon={faCircleExclamation} />
    </span>
    <p class="messageWarn">{notification}</p>
  {:else}
    <span class="icon">
      <Fa icon={faCircleCheck} />
    </span>
    <p class="message">{notification}</p>
  {/if}
  <span class="close" on:click={closeNow} on:keydown={closeNow}>
    <Fa icon={faXmark} />
  </span>
</section>

<style>
  .toast-card {
    top: 15%;
    right: 5%;
    margin-top: -2.5rem; /* Negative half of height. */
    margin-left: -5rem;
    height: 3.5rem;
    width: 8rem;
    opacity: 100%;
    border: 1px solid var(--dark-paperlike);
    border-radius: 0.33rem;
    z-index: 1;
    position: fixed;
    background-color: white;
    box-shadow: 0 0 2.5rem grey;
    display: grid;
    grid-template-columns: 1.5rem 4.25fr 1.25rem;
    justify-items: center;
    align-items: center;
  }
  .icon {
    font-size: 0.9rem;
    margin: 0.2rem;
  }

  .warning-icon {
    color: var(--warn);
  }

  .message {
    font-size: 0.6rem;
    text-align: center;
  }

  .messageWarn {
    font-size: 0.6rem;
    text-align: center;
    color: var(--warn);
  }

  .close {
    font-size: 0.9rem;
    align-self: start;
    justify-self: center;
    color: var(--dark-paperlike);
  }
</style>
