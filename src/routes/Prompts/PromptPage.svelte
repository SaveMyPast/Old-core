<script>
  import WritePrompt from "../../components/Prompt/WritePrompt.svelte";
  import Prompt from "../../components/Prompt/Prompt.svelte";
  import { onMount } from "svelte";
  import { analytics } from "../../services/DB/firebase";
  import { logEvent } from "firebase/analytics";

  onMount(() => {
    logEvent(analytics, "page_view", {
      page_title: "Prompt",
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  });
</script>

<Prompt />
<WritePrompt />
