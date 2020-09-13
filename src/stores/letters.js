import { writable } from 'svelte/store';
import Alphabet     from '../utils/Alphabet/Alphabet';
import { Shuffler } from '../utils/Shuffler';

const createLettersStore = () => {
    const { subscribe, update, set } = writable([]);

    return {
        subscribe,
        reset    : () => {
            set(Alphabet.generate());
        },
        use      : (char) => {
            update((letters) => {
                letters.forEach((letter) => {
                    if (letter.equals(char)) {
                        letter.setUsed(true);
                    }
                });

                return letters;
            });
        },
        hideLabel: (isHidden) => {
            update((letters) => {
                letters.forEach((letter) => {
                    letter.setLabelViewable(isHidden);
                });

                if (isHidden) {
                    return Shuffler.random(letters);
                }

                return letters.sort((letter, other) => letter.compare(other));
            });
        },
        hideUsed : (isHidden) => {
            update((letters) => {
                letters.forEach((letter) => {
                    letter.setUseViewable(isHidden);
                });

                return letters;
            });
        }
    }
}

export const lettersStore = createLettersStore();
