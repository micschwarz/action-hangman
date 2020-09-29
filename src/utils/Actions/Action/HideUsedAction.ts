import { Action }       from './Action';
import { lettersStore } from '../../../stores/letters';

export class HideUsedAction extends Action {
    getIcon(): string {
        return 'question-circle';
    }

    protected _run(): number {
        lettersStore.modify(letters => {
            letters.forEach(letter => letter.setUseHidden(true));
            return letters;
        });

        return 1;
    }

    protected _reset() {
        lettersStore.modify(letters => {
            letters.forEach(letter => letter.setUseHidden(false));
            return letters;
        })
    }

    getName(): string {
        return "Verstecke Benutzte";
    }

    getDescription(): string {
        return "Alle benutzten Buchstaben werden versteckt";
    }
}
