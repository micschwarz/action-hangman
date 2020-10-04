import type { Game }   from '../../Game';
import type { Letter } from '../../Alphabet/Letter';
import { Action }      from './Action';
import { get }         from 'svelte/store';

export class RandomLetterAction extends Action {

    private randomChar: Letter;

    getIcon(): string {
        return 'plus-circle';
    }

    protected _run(game: Game): number {
        const unusedChars = get(game.getAlphabetStore())
            .filter(letter => !letter.isUsed());

        this.randomChar = unusedChars[~~(unusedChars.length * Math.random())];

        game.getAlphabetStore().use(this.randomChar.getValue());
        return 0;
    }

    protected _reset() {
        // Do nothing
    }

    getColor(): string {
        return 'green';
    }

    getName(): string {
        return 'Zufälliger Buchstabe';
    }

    getDescription(): string {
        return `Der Buchstabe <b>${ this.randomChar.getLabel() }</b> wurde für dich aktiviert`;
    }
}
