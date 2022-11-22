<script>
  import LoginBulletin from "../../components/Account/Login/LoginBulletin.svelte";
  import Bulletin from "../../components/General/Bulletin.svelte";
  import SamplePromptsBulletin from "../../components/SamplePromptsBulletin.svelte";
  import { setContext } from "svelte";
  import { displayLogInBulletin } from "../../stores/loginStore";
  import { displaySignUpBulletin } from "./../../stores/loginStore.js";
  import SignupBulletin from "../../components/Account/Login/signupBulletin.svelte";

  const welcomeParagraph =
    "This website is aimed at helping individuals think about, record, and build up their own personal history. Just start off with a prompt, and let your memories flow onto the page, and if the prompt just doesn't match your personal experience, you can customize them any way you'd like ensuring your life is remembered the way you experienced it.";

  const exampleSubtitle =
    "A prompt a day makes personal histories quick and fun!";
  const exampleParagraph =
    "Thought provoking prompts makes writing a personal history to be shared with your friends, family, or children accessible to all! The prompts are well planned and engineered to get those memory juices flowing, helping you to highlight what was important in your life.";

  const timelineSubtitle = "Never forget the details.";
  const timelineParagraph =
    "With the timeline, you can find past entries, prompts, and even add a new one if you find yourself on a roll remembering all the wonderful, life changing, or difficult times you've experienced.";

  setContext("welcomeBulletin", {
    header: {
      title: "Welcome to Save my Past.",
      subtitle: "The place for making your personal history happen",
    },
    main: [
      { initial: welcomeParagraph },
      { subtitle: exampleSubtitle, paragraph: exampleParagraph },
      { subtitle: timelineSubtitle, paragraph: timelineParagraph },
    ],
  });
</script>

<section id="wrapper">
  {#if $displaySignUpBulletin}
    <article>
      <SignupBulletin />
      <Bulletin context="welcomeBulletin" />
    </article>
  {:else}
    <article>
      <Bulletin context="welcomeBulletin" />
    </article>
  {/if}
  <article>
    {#if $displayLogInBulletin}
      <LoginBulletin />
    {:else}
      <SamplePromptsBulletin />
    {/if}
  </article>
</section>

<style>
  #wrapper {
    display: flex;
    justify-content: space-around;
    flex: 1 1;
  }
</style>
