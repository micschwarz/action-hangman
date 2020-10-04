import type { Game } from '../../Game';
import { Action }    from './Action';

export class HideUsedAction extends Action {
    getIcon(): string {
        return 'question-circle';
    }

    protected _run(game: Game): number {
        game.getAlphabetStore().modify(letters => {
            letters.forEach(letter => letter.setUseHidden(true));
            return letters;
        });

        return 1;
    }

    protected _reset(game: Game) {
        game.getAlphabetStore().modify(letters => {
            letters.forEach(letter => letter.setUseHidden(false));
            return letters;
        });
    }

    getColor(): string {
        return 'blue';
    }

    getName(): string {
        return 'Verstecke Benutzte';
    }

    getDescription(): string {
        return 'Alle benutzten Buchstaben werden versteckt';
    }
}
