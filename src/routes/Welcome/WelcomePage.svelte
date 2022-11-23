<script>
  import WelcomeBulletin from "../../components/General/WelcomeBulletin.svelte";
  import SamplePromptsBulletin from "../../components/Prompt/SamplePromptsBulletin.svelte";
</script>

<section id="wrapper">
  <article>
    <WelcomeBulletin context="welcomeBulletin" />
  </article>
  <article>
    <SamplePromptsBulletin />
  </article>
</section>

<style>
  #wrapper {
    display: flex;
    justify-content: space-around;
    flex: 1 1;
  }
</style>
