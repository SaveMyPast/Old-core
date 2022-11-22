<script>
  import { logout } from "./../../services/Auth/login-service.js";
  import { onDestroy } from "svelte";
  import {
    displayLogInBulletin,
    displaySignUpBulletin,
    userAuth,
  } from "../../stores/loginStore";

  const signUpClick = () => {
    displaySignUpBulletin.set(!$displaySignUpBulletin);
  };

  const loginClick = () => {
    displayLogInBulletin.set(!$displayLogInBulletin);
  };

  onDestroy(() => {});
</script>

<nav>
  <ul>
    <li>Welcome</li>
    <li>Timeline</li>
    <li>Profile</li>
    <li>Settings</li>
    {#if !$userAuth}
      <li on:click={signUpClick} on:keydown={signUpClick}>Sign up</li>
      <li on:click={loginClick} on:keydown={loginClick}>Log in</li>
    {:else}
      <li on:click={logout} on:keydown={logout}>Log out</li>
    {/if}
  </ul>
</nav>

<style>
  ul {
    display: inline-flex;
    width: 100%;
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: var(--primary);
  }
  li {
    display: block;
    color: var(--dark-paperlike);
    text-align: center;
    padding: 1.25rem 1.5rem;
    text-decoration: none;
  }

  li:hover {
    background-color: var(--secondary);
    color: var(--paperlike);
  }
</style>
