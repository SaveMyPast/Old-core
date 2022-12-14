<script>
  import Profile from "../../components/Account/Profile/Profile.svelte";
  import { analytics } from "../../services/DB/firebase";
  import { logEvent } from "firebase/analytics";
  import { onMount } from "svelte";

  onMount(() => {
    logEvent(analytics, "page_view", {
      page_title: "Profile",
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  });
</script>

<Profile />

<style>
</style>
