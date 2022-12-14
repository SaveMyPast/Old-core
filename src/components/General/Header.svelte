<script lang="ts">
  import { userInformationStore } from "../../stores/loginStore";
  import { logout } from "./../../services/Auth/login-service";
  import { link } from "svelte-routing";
  import { userAuth } from "../../stores/loginStore";
  import Modal from "./Modal.svelte";
  import LoginBulletin from "../Account/Login/LoginBulletin.svelte";

  let showLogin = false;
  let showSignup = false;
</script>

{#if showLogin}
  <Modal
    headerText={"Log in."}
    closer={"closeLogin"}
    on:closeLogin={() => {
      showLogin = false;
    }}
    ><LoginBulletin />
  </Modal>
{/if}

{#if showSignup}
  <Modal
    headerText={"Sign up."}
    closer={"closeSignup"}
    on:closeSignup={() => {
      showSignup = false;
    }}
    ><SignupBulletin />
  </Modal>
{/if}

<nav>
  {#if $userAuth}
    {#if $userInformationStore.isAdmin}
      <a class="link" href="/admin" use:link>Administration</a>
    {/if}
    <a class="link" href="prompts" use:link>Prompts</a>
    <a class="link" href="profile" use:link>Profile</a>
    <a class="link" href="settings" use:link>Settings</a>
    <a class="link" href="timeline" use:link>Timeline</a>
  {/if}
  <a class="link" href="/" use:link>Welcome</a>
  {#if !$userAuth}
    <span
      class="link"
      on:click={() => (showSignup = true)}
      on:keydown={() => (showSignup = true)}
    >
      Sign up
    </span>
    <span
      class="link"
      on:click={() => (showLogin = true)}
      on:keydown={() => (showLogin = true)}>Login</span
    >
  {:else}
    <span class="link" on:click={logout} on:keydown={logout} use:link>
      Log out
    </span>
  {/if}
</nav>

<style>
  nav {
    display: inline-flex;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: var(--primary);
  }
  .link,
  :global(a) {
    display: block;
    color: var(--dark-paperlike);
    text-align: center;
    padding: 1.25rem 1.5rem;
    text-decoration: none;
  }

  .link:hover,
  :global(a:hover) {
    background-color: var(--secondary);
    color: var(--paperlike);
  }
</style>
