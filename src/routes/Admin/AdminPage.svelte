<script>
  import AdminPanel from "../../components/Admin/AdminPanel.svelte";
  import { onMount } from "svelte";
  import { analytics } from "../../services/DB/firebase";
  import { logEvent } from "firebase/analytics";

  onMount(() => {
    logEvent(analytics, "page_view", {
      page_title: "Admin",
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  });
</script>

<AdminPanel />
