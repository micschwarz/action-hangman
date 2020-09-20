import { Action }       from './Action';
import { lettersStore } from '../../stores/letters';

export class HideUsedAction extends Action {
    _run() {
        lettersStore.hideUsed(true);
        return 1;
    }

    _reset() {
        lettersStore.hideUsed(false);
    }

    getIcon() {
        return 'question-circle';
    }
}
