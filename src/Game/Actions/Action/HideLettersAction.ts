import type { Game } from '../../Game';
import { Action }    from './Action';
import { Shuffler }  from '../../Shuffler';

export class HideLettersAction extends Action {
    getIcon(): string {
        return 'shuffle';
    }

    protected _reset(game: Game) {
        game.getAlphabetStore().modify(letters => {
            letters.forEach(letter => letter.resetLabel());

            return letters.sort((letter, other) => letter.compare(other));
        });
    }

    protected _run(game: Game): number {
        game.getAlphabetStore().modify(letters => {
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
