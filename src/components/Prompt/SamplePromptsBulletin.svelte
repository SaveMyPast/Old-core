<script>
  import { link } from "svelte-routing";
  let prompts = [
    "Write about a defining moment when you were in middle school that changed the course of your future. What was the moment, and how did it impact your choices and decisions moving forward? How do you view that moment now, and how has it shaped the person you are today?",
    "Describe a memorable childhood vacation you took. Where did you go, who did you go with, and what made it so special? What are some of the things you did while you were there, and what are some of the things you remember most vividly? How did this vacation affect your relationships and overall outlook on life?",
  ];
  let randomPrompt = 0;
  const randomizePrompt = () => {
    randomPrompt = Math.floor(Math.random() * prompts.length);
  };
</script>

<section>
  <h2>{prompts[randomPrompt]}</h2>
  <p>
    When you log into SaveMyPast.com, you'll be greeted with thought-provoking
    prompts, such as this one, that will help you capture your personal history.
    These prompts are designed to inspire you to write about the most important
    moments and events in your life. You can easily access your responses to
    these prompts on your timeline and even share them with your loved ones. And
    if you're a pro member, you'll soon be able to integrate your responses with
    FamilySearch Memories so you can preserve them for generations to come. Sign
    up now and start writing your personal history today!
  </p>
  <button on:click={randomizePrompt}>Cycle through random prompts!</button>
  <button href="login" use:link>Answer a prompt like this!</button>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
