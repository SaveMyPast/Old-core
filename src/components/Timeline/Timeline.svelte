<script lang="ts">
  import TimelinePromptList from "./TimelinePromptList.svelte";
  import SelectedPrompt from "./SelectedPrompt.svelte";
</script>

<section class="wrapper">
  <section class="list-of-prompts">
    <TimelinePromptList />
  </section>
  <section class="selected-prompt">
    <SelectedPrompt />
  </section>
</section>

<style>
  .wrapper {
    margin: 1rem;
    display: flex;
    flex-direction: row;
    max-height: 90%;
    border: 1px solid var(--dark-paperlike);
    border-radius: 0.33rem;
  }

  .list-of-prompts {
    border-right: 1px solid var(--dark-paperlike);
    text-overflow: ellipsis;
    width: 33%;
  }

  .selected-prompt {
    background-color: white;
    width: 66%;
  }
</style>
