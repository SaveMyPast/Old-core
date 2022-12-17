<script lang="ts">
  import { userAuth$ } from "../../../stores/loginStore";
  import { signUpNewUser, logout } from "../../../services/Auth/login-service";
  import { writable } from "svelte/store";
  import passwordValidator from "password-validator";
  import { logEvent } from "firebase/analytics";
  import { analytics } from "../../../services/DB/firebase";
  import { onMount } from "svelte";

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
      logEvent(analytics, "signup_event");
      credentials = {
        email: null,
        password: null,
        fullName: null,
        birthdate: null,
      };
    } else {
      validationMessageStore.set("Form is invalid");
      logEvent(analytics, "signup_failed_invalid_form");
    }
  };

  let credentials = {
    email: null,
    password: null,
    fullName: null,
    birthdate: null,
  };

  onMount(() => {
    logEvent(analytics, "page_view", {
      page_title: "Signup",
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  });
</script>

<form on:submit|preventDefault={handleSignup}>
  {#if !$userAuth$}
    <label for="fullName" id="flabel">
      <p>Full Name</p>
    </label>
    <label for="birthdate" id="blabel">
      <p>Birthdate</p>
    </label>
    <input
      id="fullName"
      placeholder="Full Name"
      required
      type="name"
      bind:value={credentials.fullName}
    />
    <input
      id="birthdate"
      placeholder="Birthdate"
      required
      type="date"
      bind:value={credentials.birthdate}
    />
    <label for="email" id="elabel">
      <p>Email</p>
    </label>
    <label for="password" id="plabel">
      <p>Password</p>
    </label>
    <input
      placeholder="Email"
      id="email"
      required
      autocomplete="false"
      on:change={emailValidation}
      type="email"
      bind:value={credentials.email}
    />
    <input
      id="password"
      placeholder="Password"
      required
      autocomplete="new-password"
      type="password"
      bind:value={credentials.password}
      on:change={passwordValidation}
    />
    <h3 class="message">
      {$validationMessageStore}
    </h3>
    <button id="submit" type="submit">Sign Up</button>
  {:else}
    <h3 class="message">You are signed up.</h3>
    <button on:click={logout}>Log out</button>
  {/if}
</form>

<style>
  form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1.5rem 2rem 1.5rem 2rem 1.5rem 2rem;
    grid-template-areas:
      "fname blabel"
      "fullName birthdate"
      "elabel plabel"
      "email password"
      "message message"
      "submit google";
    grid-gap: 0.5rem;
    padding: 1rem;
    justify-content: center;
    align-items: center;
  }

  .message {
    color: var(--warn);
    grid-area: message;
  }
</style>
