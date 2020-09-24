import { writable } from 'svelte/store';
import Alphabet from '../utils/Alphabet/Alphabet';
import type { Letter } from "../utils/Alphabet/Letter";

const createLettersStore = () => {
    const { subscribe, update, set } = writable([]);

    return {
        subscribe,
        reset    : () => {
            set(Alphabet.generate());
        },
        use      : (char) => {
            let didUpdate = false;
            update((letters) => {
                letters.forEach((letter) => {
                    if (letter.equals(char)) {
                        didUpdate = !letter.isUsed();
                        letter.setUsed(true);
                    }
                });

                return letters;
            });
            return didUpdate;
        },
        modify: (fn: (letters: Letter[]) => Letter[]) => {
            update((letters) => fn(letters));
        }
    }
}

export const lettersStore = createLettersStore();
