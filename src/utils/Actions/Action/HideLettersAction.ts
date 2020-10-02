import { lettersStore } from '../../../stores/letters';
import { Action }       from './Action';
import { Shuffler }     from '../../Shuffler';

export class HideLettersAction extends Action {
    getIcon(): string {
        return 'shuffle';
    }

    protected _reset() {
        lettersStore.modify(letters => {
            letters.forEach(letter => letter.resetLabel());

            return letters.sort((letter, other) => letter.compare(other));
        });
    }

    protected _run(): number {
        lettersStore.modify(letters => {
            letters.forEach(letter => letter.setLabel('?'));

            return Shuffler.random(letters);
        });

        return 1;
    }

    getName(): string {
        return 'Versteckte Buchstaben';
    }

    getColor(): string {
        return 'red';
    }

    getDescription(): string {
        return 'Alle Buchstaben werden versteckt und vertauscht';
    }
}
