<script lang="ts">
  import Settings from "../../components/Account/Settings/Settings.svelte";
  import { analytics } from "../../services/DB/firebase";
  import { logEvent } from "firebase/analytics";
  import { onMount } from "svelte";

  onMount(() => {
    logEvent(analytics, "page_view", {
      page_title: "Settings",
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  });
</script>

<Settings />

<style>
</style>
