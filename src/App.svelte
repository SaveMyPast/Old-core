<script>
  import Prompt from "./components/Prompt/Prompt.svelte";
  import Welcome from "./routes/Welcome/Welcome.svelte";
  import { userAuth } from "./stores/loginStore";
  import Header from "./components/General/Header.svelte";
  import WritePrompt from "./components/Prompt/WritePrompt.svelte";
</script>

<section>
  <Header />
  <section id="main">
    {#if $userAuth}
      <Prompt />
      <WritePrompt />
    {:else}
      <Welcome />
    {/if}
  </section>
</section>

<style>
  #main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: auto;
  }
  :global(article) {
    margin: 1.5rem;
    flex: 1 1;
  }
  :global(input) {
    background-color: var(--primary);
    color: var(--dark-paperlike);
    border: none;
    border-radius: 0.33rem;
    max-width: 15rem;
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
    text-align: justify;
    margin: 0;
  }

  :global(h2) {
    color: var(--secondary);
    font-size: 1.5rem;
    text-align: justify;
    margin: 0;
  }

  :global(p) {
    color: var(--dark-paperlike);
    font-size: 1rem;
  }

  :global(h3) {
    color: var(--primary);
    font-size: 0.75rem;
    text-align: justify;
    margin: 0;
  }

  :global(body) {
    --primary: #bfd0ee;
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
