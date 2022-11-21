<script>
  import { user } from "../../stores/loginStore.js";
  import {
    loginWithUsernameAndPassword,
    loginWithGoogle,
    logout,
  } from "./../../services/Auth/login-service.js";

  let credentials = { email: null, password: null };
</script>

<article class="bulletin">
  {#if !$user}
    <section>
      <input placeholder="Email" bind:value={credentials.email} />
      <input
        placeholder="Password"
        type="password"
        bind:value={credentials.password}
      />
    </section>
    <section>
      <button
        on:click={loginWithUsernameAndPassword(
          credentials.email,
          credentials.password
        )}>Log in</button
      >
      <button on:click={loginWithGoogle}>Log in with Google</button>
    </section>
  {:else}
    <section>
      <button on:click={logout}>Log out </button>
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
    width: 100%;
    border: 1px solid black;
    border-radius: 0.33rem;
    box-shadow: -2px 5px 5px darkgrey;
  }
</style>
