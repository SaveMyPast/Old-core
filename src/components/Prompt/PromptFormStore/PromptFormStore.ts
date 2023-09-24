import promptFormAdapter from '../../../services/adapters/promptFormAdapter';
import { PromptFormStoreInterface } from '../../../services/interfaces/PromptFormStoreInterface';
import { adapt } from '../../../state-adapt';

const defaultPromptForm: PromptFormStoreInterface = {
	userResponse: {
		response: '',
		responseValid: false,
		responseError: 'Response not provided'
	},
	tags: {
		tags: [],
		tagsValid: false,
		tagsError: 'Tags not provided'
	},
	year: {
		year: '',
		yearValid: false,
		yearError: 'Year not provided'
	},
	age: {
		age: 0,
		ageValid: false,
		ageError: 'Age not provided'
	},
	location: {
		location: '',
		locationValid: false,
		locationError: 'Location not provided'
	},
	promptId: {
		promptId: '',
		promptIdValid: false,
		promptIdError:
      'There has been an error with the server. [Promptid not found]'
	},
	prompt: {
		prompt: '',
		promptValid: false,
		promptError: 'There has been an error with the server. [Prompt not found]'
	},
	formValid: false
};

export const promptFormStore = adapt(
	['promptFormStore', defaultPromptForm],
	promptFormAdapter
);
