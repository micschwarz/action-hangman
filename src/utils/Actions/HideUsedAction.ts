import { Action } from './Action';
import { lettersStore } from '../../stores/letters';

export class HideUsedAction extends Action {
    getIcon(): string {
        return 'question-circle';
    }

    protected _run(): number {
        lettersStore.hideUsed(true);
        return 1;
    }

    protected _reset() {
        lettersStore.hideUsed(false);
    }

    getName(): string {
        return "Verstecke Benutzte";
    }

    getDescription(): string {
        return "Alle benutzten Buchstaben werden versteckt";
    }
}
