import * as React from 'react';
import AddTags from '../AddTags';
import { promptStore } from '../../../services/stores/promptStore';
import { promptFormStore } from '../PromptFormStore/PromptFormStore';
import { useStore } from '@state-adapt/react';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../../services/firebase';

const TagsField = () => {
	const prompts = useStore(promptStore);
	const promptForm = useStore(promptFormStore);

	const handleDeleteTag = (tag: string) => {
		const payload = {
			tag,
			prompt: prompts.activePrompt
		};

		logEvent(analytics, 'delete_tag', {
			tag,
			prompt: prompts.activePrompt.prompt,
			id: prompts.activePrompt.id
		});

		promptStore.deleteActivePromptTag(payload);
	};

	const handleAddTag = (tags: string[]) => {
		const payload = {
			tags,
			prompt: prompts.activePrompt
		};

		logEvent(analytics, 'add_tags', {
			tags,
			prompt: prompts.activePrompt.prompt,
			id: prompts.activePrompt.id
		});

		promptStore.addActivePromptTags(payload);
		promptFormStore.update;
	};

	const handleResetTags = () => {
		logEvent(analytics, 'reset_tags', {
			prompt: prompts.activePrompt.prompt,
			id: prompts.activePrompt.id
		});
		promptStore.resetActiveTags();
	};

	React.useEffect(() => {
		promptFormStore.update({
			...promptForm.state,
			tags: {
				tags: prompts.activePrompt.tags,
				tagsValid: true,
				tagsError: ''
			}
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
