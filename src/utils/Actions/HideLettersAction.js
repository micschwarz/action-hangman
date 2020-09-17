import { lettersStore } from '../../stores/letters';
import { Action }       from './Action';

export class HideLettersAction extends Action {
    _run() {
        lettersStore.hideLabel(true);
        return 1;
    }

    _reset() {
        lettersStore.hideLabel(false);
    }
}
