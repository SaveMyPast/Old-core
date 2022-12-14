<script lang="ts">
  import { logEvent } from "firebase/analytics";
  import { onMount } from "svelte";
  import Timeline from "../../components/Timeline/Timeline.svelte";
  import { analytics } from "../../services/DB/firebase";
  onMount(() => {
    logEvent(analytics, "page_view", {
      page_title: "Timeline",
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  });
</script>

<Timeline />

<style>
</style>
