import { Action } from './Action';
import { lettersStore } from '../../stores/letters';
import { get } from 'svelte/store';

export class RandomLetterAction extends Action {
    getIcon(): string {
        return 'plus-circle';
    }

    getColor(): string {
        return 'green'
    }

    protected _run(): number {
        const unusedChars = get(lettersStore)
            .filter(letter => !letter.isUsed());

        const randomChar = unusedChars[~~(unusedChars.length * Math.random())];

        lettersStore.use(randomChar.getValue());
        return 0;
    }

    protected _reset() {
        // Do nothing
    }
}
