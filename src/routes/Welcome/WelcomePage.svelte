<script lang="ts">
  import { logEvent } from "firebase/analytics";
  import { onMount } from "svelte";
  import WelcomeBulletin from "../../components/General/WelcomeBulletin.svelte";
  import SamplePromptsBulletin from "../../components/Prompt/SamplePromptsBulletin.svelte";
  import { analytics } from "../../services/DB/firebase";

  onMount(() => {
    logEvent(analytics, "page_view", {
      page_title: "Welcome",
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  });
</script>

<section id="wrapper">
  <article>
    <WelcomeBulletin />
  </article>
  <article>
    <SamplePromptsBulletin />
  </article>
</section>

<style>
  #wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>
