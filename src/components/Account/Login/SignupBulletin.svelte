<script>
  import { userAuth } from "../../../stores/loginStore.js";
  import {
    signUpNewUser,
    loginWithGoogle,
    logout,
  } from "../../../services/Auth/login-service.js";
  import { writable } from "svelte/store";

  const validationStore = writable();

  let validForm = false;

  const validateFields = () => {
    if (credentials) {
      validForm = true;
    }
  };

  const emailRegex = () => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      credentials.email
    );
  };

  const emailValidation = () => {
    emailRegex()
      ? validationStore.set()
      : validationStore.set("Invalid email address.");
  };

  let credentials = {
    email: null,
    password: null,
    fullName: null,
    birthdate: null,
  };
</script>

<section class="bulletin">
  {#if !$userAuth}
    <input placeholder="Full Name" bind:value={credentials.fullName} />
    <input placeholder="Birthdate" bind:value={credentials.birthdate} />
    <input
      placeholder="Email"
      on:change={emailValidation}
      type="email"
      bind:value={credentials.email}
    />
    <input
      placeholder="Password"
      type="password"
      bind:value={credentials.password}
      on:change={validateFields}
    />
    <button on:click={signUpNewUser(credentials)}>Sign Up</button>
    <button on:click={loginWithGoogle} disabled>Sign up with Google</button>
  {:else}
    <h3>You are signed up.</h3>
    <button on:click={logout}>Log out</button>
  {/if}
</section>

<style>
  .bulletin {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    padding: 1rem;
    justify-content: center;
    align-items: center;
  }
</style>
