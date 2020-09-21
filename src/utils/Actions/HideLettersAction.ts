import { lettersStore } from '../../stores/letters';
import { Action } from './Action';

export class HideLettersAction extends Action {
    getIcon(): string {
        return 'shuffle';
    }

    protected _reset() {
        lettersStore.hideLabel(false);
    }

    protected _run(): number {
        lettersStore.hideLabel(true);
        return 1;
    }
}
