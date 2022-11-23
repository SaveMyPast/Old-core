<script>
  const headerTitle = "Welcome to Save my Past.";
  const headerSubtitle = "The place for making your personal history happen";
  const welcomeParagraph =
    "This website is aimed at helping individuals think about, record, and build up their own personal history. Just start off with a prompt, and let your memories flow onto the page, and if the prompt just doesn't match your personal experience, you can customize them any way you'd like ensuring your life is remembered the way you experienced it.";

  const exampleSubtitle =
    "A prompt a day makes personal histories quick and fun!";
  const exampleParagraph =
    "Thought provoking prompts makes writing a personal history to be shared with your friends, family, or children accessible to all! The prompts are well planned and engineered to get those memory juices flowing, helping you to highlight what was important in your life.";

  const timelineSubtitle = "Never forget the details.";
  const timelineParagraph =
    "With the timeline, you can find past entries, prompts, and even add a new one if you find yourself on a roll remembering all the wonderful, life changing, or difficult times you've experienced.";
</script>

<section class="header">
  <h1>
    {headerTitle}
  </h1>
  <h3>
    {headerSubtitle}
  </h3>
</section>

<!-- 
    <section>
      <div class="bulletin-image-container">
        <img src={content.image.src} alt={content.image.title} />
        <h3>
          {content.image.title}
        </h3>
      </div>
    </section>
-->

<section class="bulletin-content">
  <p class="bulletin-content-paragraph">
    {welcomeParagraph}
  </p>
  <h2 class="bulletin-content-subtitle">
    {exampleSubtitle}
  </h2>
  <p class="bulletin-content-paragraph">
    {exampleParagraph}
  </p>
</section>
<section class="bulletin-content">
  <h2 class="bulletin-content-subtitle">
    {timelineSubtitle}
  </h2>
  <p class="bulletin-content-paragraph">
    {timelineParagraph}
  </p>
</section>

<style>
  .bulletin {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--dark-paperlike);
    border-radius: 0.33rem;
    box-shadow: -2px 5px 5px darkgrey;
  }

  .bulletin-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .bulletin-content-paragraph {
    width: 100%;
    text-align: justify;
  }
</style>
