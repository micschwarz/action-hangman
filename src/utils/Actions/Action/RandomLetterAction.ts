import { Action }       from './Action';
import { lettersStore } from '../../../stores/letters';
import { get }          from 'svelte/store';
import type { Letter }  from '../../Alphabet/Letter';

export class RandomLetterAction extends Action {

    private randomChar: Letter;

    getIcon(): string {
        return 'plus-circle';
    }

    protected _run(): number {
        const unusedChars = get(lettersStore)
            .filter(letter => !letter.isUsed());

        this.randomChar = unusedChars[~~(unusedChars.length * Math.random())];

        lettersStore.use(this.randomChar.getValue());
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
