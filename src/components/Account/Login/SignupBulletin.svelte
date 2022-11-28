<script>
  import { userAuth } from "../../../stores/loginStore.js";
  import {
    signUpNewUser,
    loginWithGoogle,
    logout,
  } from "../../../services/Auth/login-service.js";
  import { writable } from "svelte/store";
  import passwordValidator from "password-validator";

  const validationMessageStore = writable(
    "Password: must be at least 6 characters long"
  );
  const formValidStore = writable(false);

  const emailRegex = () => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      credentials.email
    );
  };

  const emailValidation = () => {
    if (!emailRegex()) {
      validationMessageStore.set("Invalid email address.");
      formValidStore.set(false);
    }
  };

  const passwordSchema = new passwordValidator()
    .is()
    .min(6)
    .is()
    .max(64)
    .has()
    .uppercase(1)
    .has()
    .lowercase(2)
    .has()
    .digits(1);

  const passwordValidation = () => {
    if (passwordSchema.validate(credentials.password)) {
      formValidStore.set(true);
      validationMessageStore.set("");
    } else {
      const errors = passwordSchema.validate(credentials.password, {
        list: true,
      });
      formValidStore.set(false);
      validationMessageStore.set("invalid password: " + errors);
    }
  };

  let handleSignup = () => {
    if ($formValidStore) {
      signUpNewUser(credentials);
    } else {
      validationMessageStore.set("Form is invalid");
    }
  };

  let credentials = {
    email: null,
    password: null,
    fullName: null,
    birthdate: null,
  };
</script>

<form on:submit|preventDefault={handleSignup}>
  {#if !$userAuth}
    <input
      placeholder="Full Name"
      required
      type="name"
      bind:value={credentials.fullName}
    />
    <input
      placeholder="Birthdate"
      required
      type="date"
      bind:value={credentials.birthdate}
    />
    <input
      placeholder="Email"
      required
      autocomplete="false"
      on:change={emailValidation}
      type="email"
      bind:value={credentials.email}
    />
    <input
      placeholder="Password"
      required
      autocomplete="new-password"
      type="password"
      bind:value={credentials.password}
      on:change={passwordValidation}
    />
    <h3 class="password" style:color="var(--warn)">
      {$validationMessageStore}
    </h3>
    <button type="submit">Sign Up</button>
    <button on:click={loginWithGoogle} disabled>Sign up with Google</button>
  {:else}
    <h3>You are signed up.</h3>
    <button on:click={logout}>Log out</button>
  {/if}
</form>

<style>
  form {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
    padding: 1rem;
    justify-content: center;
    align-items: center;
  }
  .password {
    grid-row: 3/4;
    grid-column: 2/3;
  }
</style>
