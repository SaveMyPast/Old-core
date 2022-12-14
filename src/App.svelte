<script lang="ts">
  import { userInformationStore } from "./stores/loginStore.js";
  import { Router, Route } from "svelte-routing";
  import WelcomePage from "./routes/Welcome/WelcomePage.svelte";
  import PromptPage from "./routes/Prompts/PromptPage.svelte";
  import TimelinePage from "./routes/Timeline/TimelinePage.svelte";
  import ProfilePage from "./routes/Profile/ProfilePage.svelte";
  import SettingsPage from "./routes/Settings/SettingsPage.svelte";
  import { userAuth } from "./stores/loginStore";
  import Header from "./components/General/Header.svelte";
  import LoginBulletin from "./components/Account/Login/LoginBulletin.svelte";
  import SignupBulletin from "./components/Account/Login/signupBulletin.svelte";
  import AdminPage from "./routes/Admin/AdminPage.svelte";
</script>

<Router basepath="/">
  <Header />
  <Route path="login"><LoginBulletin /></Route>
  <Route path="signup"><SignupBulletin /></Route>
  {#if $userAuth}
    <Route path="prompts"><PromptPage /></Route>
    <Route path="profile"><ProfilePage /></Route>
    <Route path="settings"><SettingsPage /></Route>
    <Route path="timeline"><TimelinePage /></Route>
    {#if $userInformationStore.isAdmin}
      <Route path="admin"><AdminPage /></Route>
    {/if}
  {/if}
  <Route path="/"><WelcomePage /></Route>
</Router>

<style>
  :global(article) {
    margin: 1.5rem;
  }

  :global(input) {
    background-color: var(--primary);
    color: var(--dark-paperlike);
    border: none;
    border-radius: 0.33rem;
  }
  :global(button) {
    background-color: var(--primary);
    color: var(--dark-paperlike);
    outline: none;
    min-width: 10rem;
    max-width: 20rem;
    border: none;
    border-radius: 0.33rem;
  }
  :global(h1) {
    color: var(--secondary);
    font-size: 1.75rem;
    text-align: center;
    margin: 0.33rem;
  }

  :global(h2) {
    color: var(--secondary);
    font-size: 1.5rem;
    text-align: left;
    margin: 0.25rem;
  }
  :global(h3) {
    color: var(--primary);
    font-size: 0.75rem;
    text-shadow: 1px 1px 1px var(--primary);
    text-align: center;
    margin: 0.1rem;
  }

  :global(p) {
    color: var(--dark-paperlike);
    font-size: 1rem;
    margin: 0.1rem;
    text-align: left;
  }

  :global(body) {
    --primary: #aec4ea;
    --secondary: #5c88c1;
    --dark-primary: #3e72cc;
    --dark-secondary: #2d4d76;
    --paperlike: #efede7;
    --dark-paperlike: #21070a;
    --warn: #f28482;
    margin: 0;
    padding: 0;
    background-color: var(--paperlike);
    color: var(--dark-paperlike);
    height: 100%;
  }
</style>
