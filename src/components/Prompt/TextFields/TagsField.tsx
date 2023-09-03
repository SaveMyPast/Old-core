import * as React from "react";
import AddTags from "../AddTags";
import { promptStore } from "../../../services/stores/promptStore";
import { promptFormStore } from "../PromptFormStore/PromptFormStore";
import { useStore } from "@state-adapt/react";

const TagsField = () => {
  const prompts = useStore(promptStore);
  const promptForm = useStore(promptFormStore);

  const handleDeleteTag = (tag: string) => {
    const payload = {
      tag: tag,
      prompt: prompts.activePrompt,
    };
    promptStore.deleteActivePromptTag(payload);
  };

  const handleAddTag = (tags: string[]) => {
    const payload = {
      tags: tags,
      prompt: prompts.activePrompt,
    };

    promptStore.addActivePromptTags(payload);
    promptFormStore.update;
  };

  const handleResetTags = () => {
    promptStore.resetActiveTags();
  };

  React.useEffect(() => {
    promptFormStore.update({
      ...promptForm.state,
      tags: {
        tags: prompts.activePrompt.tags,
        tagsValid: true,
        tagsError: "",
      },
    });
  }, [prompts.activePrompt.tags]);

  return (
    <>
      <AddTags
        tags={prompts.activePrompt.tags}
        addTags={handleAddTag}
        deleteTag={handleDeleteTag}
        resetTags={handleResetTags}
      />
    </>
  );
};

export default TagsField;
