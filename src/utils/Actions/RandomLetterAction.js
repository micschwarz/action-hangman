import { Action }       from './Action';
import { lettersStore } from '../../stores/letters';
import { get }          from 'svelte/store';

export class RandomLetterAction extends Action {
    _run() {
        const unusedChars = get(lettersStore)
            .filter(letter => !letter.isUsed());

        const randomChar = unusedChars[~~(unusedChars.length * Math.random())];

        lettersStore.use(randomChar.getValue());
        return 0;
    }

    _reset() {

    }

    getIcon() {
        return 'plus-circle';
    }

    getColor() {
        return 'green'
    }
}
