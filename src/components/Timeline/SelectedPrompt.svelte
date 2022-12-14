<script lang="ts">
  import { selectedPromptStore } from "../../stores/TimelineStore.js";
</script>

<h1>{$selectedPromptStore.promptData.prompt}</h1>
<p>{$selectedPromptStore.promptData.userResponse}</p>
