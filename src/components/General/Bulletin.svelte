<script>
  import { getContext } from "svelte";
  export let context;
  const content = getContext(context);
</script>

<article class="bulletin">
  <section class="header">
    <h1>
      {content.header.title}
    </h1>
    <h3>
      {content.header.subtitle}
    </h3>
  </section>

  {#if content.image}
    <section>
      <div class="bulletin-image-container">
        <img src={content.image.src} alt={content.image.title} />
        <h3>
          {content.image.title}
        </h3>
      </div>
    </section>
  {/if}

  <section class="bulletin-content">
    {#each content.main as { initial, subtitle, paragraph }}
      {#if initial}
        <p class="bulletin-content-paragraph">
          {initial}
        </p>
      {/if}
      {#if subtitle}
        <h2 class="bulletin-content-subtitle">
          {subtitle}
        </h2>
      {/if}
      {#if paragraph}
        <p class="bulletin-content-paragraph">
          {paragraph}
        </p>
      {/if}
    {/each}
  </section>
</article>

<style>
  .bulletin {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    width: 100%;
    border: 1px solid black;
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

  .bulletin-image-container {
    padding: 5px;
    border: 1px solid black;
    flex-basis: content;
  }

  .bulletin-image-container img {
    width: 100%;
  }
</style>
