import { derived, writable } from 'svelte/store';
import { lettersStore }      from './letters';

export const wordStoreMaster = writable("");

const createPlayerWordStore = () => {
    return derived(
        [wordStoreMaster, lettersStore],
        /**
         * Creates word for player
         * @param {string} $word
         * @param {Letter[]}$letters
         */
        ([$word, $letters]) => {
            const word = $word.toLowerCase().split('');
            const letters = $letters
                .filter(letter => word.includes(letter.getValue()))
                .reduce((map, letter) => {
                    map[letter.getValue()] = letter;
                    return map;
                }, {});

            return word.map(char => letters[char].isUsed() ? char : '_').join('');
        }
    );
}

export const wordStorePlayer = createPlayerWordStore();
