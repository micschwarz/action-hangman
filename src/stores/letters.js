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
