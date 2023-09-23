import * as React from 'react';
import { CircularProgress, IconButton, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import useSubmitPromptResponse from '../../services/customHooks/useSubmitPromptResponse';
import SwapPrompt from './SwapPrompt';
import ModifyPrompt from './ModifyPrompt';
import ShowTags from './ShowTags';
import { promptFormStore } from './PromptFormStore/PromptFormStore';
import YearField from './TextFields/YearField';
import AgeField from './TextFields/AgeField';
import LocationField from './TextFields/LocationField';
import PromptField from './TextFields/PromptField';
import JoinedStores from './PromptFormStore/JoinedPromptsAndFormStore';
import TagsField from './TextFields/TagsField';
import { useStore } from '@state-adapt/react';
import { PromptData } from '../../services/interfaces/interfaces';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../services/firebase';

const calculateWordCount = (input: string) => {
	return input.split(' ').length;
};

const WritePrompt = () => {
	const store = useStore(JoinedStores);

	const [submitPromptResponse, , failPromptSend, promptSending] =
    useSubmitPromptResponse();

	const savePrompt = async () => {
		const promptResponseData: PromptData = {
			prompt: store.form.prompt.prompt,
			id: store.form.promptId.promptId,
			year: store.form.year.year,
			age: store.form.age.age,
			location: store.form.location.location,
			tags: store.form.tags.tags,
			userResponse: store.form.userResponse.response
		};

		logEvent(analytics, 'prompt_submit_attempt', {
			prompt: promptResponseData.prompt,
			id: promptResponseData.id
		});

		promptFormStore.checkValidity();
		if (store.formValidity) {
			logEvent(analytics, 'prompt_submit_success', {
				prompt: promptResponseData.prompt,
				id: promptResponseData.id,
				age: promptResponseData.age,
				responseWordCount: calculateWordCount(promptResponseData.userResponse),
				tags: promptResponseData.tags
			});

			await submitPromptResponse(promptResponseData);
		}
	};

	if (promptSending) {
		return <CircularProgress />;
	}

	if (failPromptSend) {
		return (
			<>
				<Typography variant="h4">
          There was an error saving the prompt
				</Typography>
				<Typography color={'warning'}>{failPromptSend}</Typography>
			</>
		);
	}

	return (
		<>
			<section className="flex flex-col">
				<section className="flex flex-row justify-end items-center gap-4">
					<ShowTags tags={store.promptsActivePrompt.tags} />

					<SwapPrompt />
					<ModifyPrompt />
				</section>
				<PromptField />
				<section className="mt-4 flex flex-wrap justify-between gap-2 md:flex-nowrap">
					<YearField />
					<AgeField />
					<LocationField />
					<TagsField />
					<IconButton onClick={savePrompt} className="flex flex-col">
						<SaveIcon color="primary" fontSize="medium" />
						<Typography color={'primary'} variant="caption">
              Save
						</Typography>
					</IconButton>
				</section>
			</section>
		</>
	);
};

export default WritePrompt;
