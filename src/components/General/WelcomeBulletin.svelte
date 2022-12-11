<script>
  const headerTitle = "Welcome to Save my Past.";
  const headerSubtitle = "The place for making your personal history happen";
  const welcomeParagraph =
    "Welcome to SaveMyPast.com, where we help you write your own personal history! Our site is designed to make it fun and easy for you to record and preserve your memories. We use prompts to encourage you to write about different aspects of your life, from your childhood to your present day experiences. Whether you're a seasoned writer or just starting out, we're here to help you capture your story and share it with others. So why wait? Start writing your history today with SaveMyPast.com!";

  const exampleSubtitle =
    "Daily prompts make writing your personal history a breeze!";
  const exampleParagraph =
    "Our thought-provoking prompts make writing a personal history that can be shared with your loved ones accessible to everyone! These carefully crafted prompts are designed to spark your memories and help you focus on the most significant events and moments in your life. Whether you're looking to share your history with your friends, family, or children, our prompts will guide you through the process and make it easy and enjoyable to record your story.";

  const timelineSubtitle = "Capture your memories.";
  const timelineParagraph =
    "Our timeline feature allows you to easily access your past entries and prompts, as well as add new ones whenever inspiration strikes. Whether you're reminiscing about life-changing events or simply remembering the little things that made your life special, our timeline makes it easy to keep track of your progress and continue writing your personal history. So why wait? Start exploring your past and sharing your story today with SaveMyPast.com!";
</script>

<section class="header">
  <h1>
    {headerTitle}
  </h1>
  <h3>
    {headerSubtitle}
  </h3>
</section>

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
