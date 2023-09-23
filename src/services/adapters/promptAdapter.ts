import { promptFormStore } from './../../components/Prompt/PromptFormStore/PromptFormStore';
import { PromptStoreInterface } from './../interfaces/PromptStoreInterface';
import { ModifyPromptPayload, PromptData } from './../interfaces/interfaces';
import { createAdapter } from '@state-adapt/core';

const reset = (state: PromptStoreInterface) => {
	return {
		prompts: state.immutablePrompts,
		immutablePrompts: state.immutablePrompts
	};
};

const promptAdapter = createAdapter<PromptStoreInterface>()({
	modifyPrompt: (
		store: PromptStoreInterface,
		promptPayload: ModifyPromptPayload
	) => {
		const state = reset(store);
		const modifiedPromptDataArray = state.prompts.map(p => {
			if (p.id === promptPayload.current.id) {
				return promptPayload.new;
			}
			return p;
		});
		return {
			prompts: modifiedPromptDataArray,
			immutablePrompts: state.immutablePrompts
		};
	},
	filterByPrompt: (store: PromptStoreInterface, prompt: PromptData) => {
		const state = reset(store);
		const filteredPromptDataArray = state.prompts.filter(p => {
			return p.id !== prompt.id;
		});
		return {
			prompts: filteredPromptDataArray,
			immutablePrompts: state.immutablePrompts
		};
	},
	filterPromptsByTag: (store: PromptStoreInterface, tag: string) => {
		const state = reset(store);

		const filteredPromptDataArray = state.prompts.filter(p => {
			return p.tags.includes(tag);
		});

		if (tag === 'all prompts') {return reset(store);}
		return {
			prompts: filteredPromptDataArray,
			immutablePrompts: state.immutablePrompts
		};
	},

	deleteActivePromptTag: (
		store: PromptStoreInterface,
		payload: { tag: string; prompt: PromptData }
	) => {
		const filteredPromptDataArray = store.prompts.map(p => {
			if (p.id === payload.prompt.id) {
				return {
					...p,
					tags: p.tags.filter(t => t !== payload.tag)
				};
			}
			return p;
		});

		return {
			prompts: filteredPromptDataArray,
			immutablePrompts: store.immutablePrompts
		};
	},

	addActivePromptTags: (
		store: PromptStoreInterface,
		payload: { tags: string[]; prompt: PromptData }
	) => {
		const filteredPromptDataArray = store.prompts.map(p => {
			if (p.id === payload.prompt.id) {
				return {
					...p,
					tags: payload.tags
				};
			}
			return p;
		});

		return {
			prompts: filteredPromptDataArray,
			immutablePrompts: store.immutablePrompts
		};
	},

	setActivePrompt: (store: PromptStoreInterface, prompt: PromptData) => {
		const activePromptArray = store.prompts.map(p => {
			if (p.id === prompt.id) {
				return { ...p, activePrompt: true, viewedPrompt: true };
			}
			return { ...p, activePrompt: false };
		});

		const setFormPrompt = () => {
			promptFormStore.syncPrompt({ prompt: prompt.prompt, id: prompt.id });
		};
		setFormPrompt();

		return {
			prompts: activePromptArray,
			immutablePrompts: store.immutablePrompts
		};
	},

	resetActiveTags: (state: PromptStoreInterface) => {
		const activePrompt = state.prompts.find(p => p.activePrompt);
		const originalPrompt = state.immutablePrompts.find(
			p => p.id === activePrompt?.id
		);

		if (activePrompt === undefined || originalPrompt === undefined) {
			return {
				prompts: state.prompts,
				immutablePrompts: state.immutablePrompts
			};
		}

		const newState: PromptData[] = state.prompts.map(p => {
			if (p.id === activePrompt?.id) {
				return { ...p, tags: originalPrompt?.tags };
			}
			return p;
		});

		return {
			prompts: newState,
			immutablePrompts: state.immutablePrompts
		};
	},

	reset,

	selectors: {
		firstPrompt: (state: PromptStoreInterface) => {
			return state.prompts[0];
		},

		activePrompt: (state: PromptStoreInterface) => {
			const activePrompt = state.prompts.find(p => p.activePrompt);

			return activePrompt?.activePrompt ? activePrompt : state.prompts[0];
		},

		nextUnviewedPrompt: (state: PromptStoreInterface) => {
			const activePrompt = state.prompts.find(p => p.activePrompt);

			const unviewedPrompt = state.prompts.map((p, i) => {
				if (activePrompt === undefined) {return state.prompts[0];}
				if (p.id === activePrompt.id) {
					return state.prompts[i + 1];
				}
			});

			return unviewedPrompt[0] ? unviewedPrompt[0] : state.prompts[0];
		},

		getAllTags: (state: PromptStoreInterface) => {
			const tags: string[] = ['all prompts'];
			state.immutablePrompts.forEach(prompt => {
				prompt.tags.forEach(tag => {
					if (tags.find(t => t === tag) === undefined) {tags.push(tag);}
				});
			});
			return tags;
		},
		allPrompts: (state: PromptStoreInterface) => {
			return state.prompts;
		}
	}
});

export default promptAdapter;
