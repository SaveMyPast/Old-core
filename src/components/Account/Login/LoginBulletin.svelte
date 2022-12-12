<script>
  import { userAuth, userAuthFailStore } from "../../../stores/loginStore.js";
  import {
    loginWithUsernameAndPassword,
    loginWithGoogle,
    logout,
    attemptForgotPassword,
  } from "../../../services/Auth/login-service.js";
  import { writable } from "svelte/store";
  import Toast from "../../General/Toast.svelte";

  const validationStore = writable();
  let passwordResetToast = false;

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

  let credentials = { email: "", password: "" };

  const handleLogin = () => {
    if ($validationStore != "Invalid email address.") {
      loginWithUsernameAndPassword(credentials.email, credentials.password);

      credentials = { email: "", password: "" };
    }
  };

  const handleForgotPassword = () => {
    if ($validationStore != "Invalid email address.") {
      attemptForgotPassword(credentials.email)
        .then(() => {
          passwordResetToast = true;
          credentials = { email: "", password: "" };
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
</script>

{#if passwordResetToast}
  <Toast
    on:closeToast={() => (passwordResetToast = false)}
    notification={"Password Reset email has been sent."}
  />
{/if}

<form on:submit|preventDefault={handleLogin}>
  <section class="bulletin">
    {#if !$userAuth}
      <input
        id="email"
        required
        placeholder="Email"
        on:change={emailValidation}
        bind:value={credentials.email}
      />
      <input
        id="password"
        required
        placeholder="Password"
        type="password"
        bind:value={credentials.password}
      />
      {#if $validationStore}
        <h3 id="message1">{$validationStore}</h3>
      {/if}
      {#if $userAuthFailStore}
        <h3 id="message2">{$userAuthFailStore}</h3>
      {/if}

      <button id="button1" type="submit">Log in</button>
      <button id="button2" on:click|once={loginWithGoogle} disabled
        >Log in with Google</button
      >
      <span
        id="forgotPassword"
        on:click={handleForgotPassword}
        on:keydown={handleForgotPassword}><h3>Reset Password?</h3></span
      >
    {:else}
      <section>
        <button id="logout" on:click={logout}>Log out </button>
      </section>
    {/if}
  </section>
</form>

<style>
  .bulletin {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr 1rem 1fr 1rem 1fr;
    grid-template-areas:
      "email email"
      "message1 message1"
      "password password"
      "message2 message3"
      "button1 button2";
    justify-items: center;
    padding: 1rem;
  }

  #email {
    grid-area: email;
    margin: 1rem;
  }
  #password {
    grid-area: password;
    margin: 1rem;
  }
  #message1 {
    grid-area: message1;
    color: var(--warn);
  }
  #message2 {
    grid-area: message2;
    color: var(--warn);
    margin: 1rem;
  }
  #button1 {
    grid-area: button1;
    justify-self: end;
    margin: 1rem;
  }

  #button2 {
    grid-area: button2;
    justify-self: start;
    margin: 1rem;
  }

  #forgotPassword {
    grid-area: message3;
    justify-self: center;
    align-self: center;
    margin: 1rem;
  }

  #logout {
    grid-area: email;
    justify-self: center;
    margin: 1rem;
  }
</style>
