<script>
  import { selectedPromptStore } from "./TimelineStore.js";
</script>

<h1>{$selectedPromptStore.promptData.prompt}</h1>
<p>{$selectedPromptStore.promptData.userResponse}</p>
