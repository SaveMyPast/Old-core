<script>
  import { userAuth } from "../../../stores/loginStore.js";
  import {
    signUpNewUser,
    loginWithGoogle,
    logout,
  } from "../../../services/Auth/login-service.js";

  let validForm = false;

  const validateFields = () => {
    if (credentials) {
      validForm = true;
    }
  };

  let credentials = {
    email: null,
    password: null,
    fullName: null,
    birthdate: null,
  };
</script>

<article class="bulletin">
  {#if !$userAuth}
    <section>
      <input placeholder="Full Name" bind:value={credentials.fullName} />
      <input placeholder="Birthdate" bind:value={credentials.birthdate} />
      <input placeholder="Email" type="email" bind:value={credentials.email} />
      <input
        placeholder="Password"
        type="password"
        bind:value={credentials.password}
        on:change={validateFields}
      />
    </section>
    <section>
      <button on:click={signUpNewUser(credentials)}>Sign Up</button>
      <button on:click={loginWithGoogle} disabled>Sign up with Google</button>
    </section>
  {:else}
    <section>
      <h3>You are already signed up.</h3>
      <button on:click={logout}>Log out</button>
    </section>
  {/if}
</article>

<style>
  .bulletin {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    border-radius: 0.33rem;
    box-shadow: -2px 5px 5px darkgrey;
  }
</style>
