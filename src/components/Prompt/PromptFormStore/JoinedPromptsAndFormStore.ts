import { joinStores } from '@state-adapt/rxjs';
import { promptFormStore } from './PromptFormStore';
import { promptStore } from '../../../services/stores/promptStore';

const JoinedStores = joinStores({
	form: promptFormStore,
	prompts: promptStore
})();

export default JoinedStores;
