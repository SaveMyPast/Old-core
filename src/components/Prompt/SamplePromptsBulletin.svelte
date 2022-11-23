<script>
  import { link } from "svelte-routing";
  let prompts = [
    "Where did you live when you were 12? What was the neighborhood like? Your friends? What sort of activities did you do?",
    "Do your best to tell me about a time you were happy beyond description. What happened? How old were you? Who was involved?",
  ];
  let randomPrompt = 0;
  const randomizePrompt = () => {
    randomPrompt = Math.floor(Math.random() * prompts.length);
  };
</script>

<section>
  <h2>{prompts[randomPrompt]}</h2>
  <p>
    When you log into SaveMyPast.com, you will be presented with prompts like
    these, to which you will be able to write a small snapshot of your personal
    history. You can then view these prompts at any time on your timeline, and
    even share them with your loved ones. Become a pro member and integrate
    these with FamilySearch Memories to store these away forever! (Coming soon)
  </p>
  <button on:click={randomizePrompt}>Cycle through random prompts!</button>
  <button href="login" use:link>Answer a prompt like this!</button>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    justify-content: center;
    align-items: center;
  }
</style>
