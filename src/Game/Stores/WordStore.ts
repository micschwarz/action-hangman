import { derived, Readable }  from 'svelte/store';
import type { Letter }        from '../Alphabet/Letter';
import type { AlphabetStore } from './AlphabetStore';

export interface WordStore extends Readable<string> {
}

export class WordStoreFactory {
    /**
     * Creates players word store.
     *
     * @param word
     * @param alphabetStore
     * @private
     */
    static create(word: string, alphabetStore: AlphabetStore): WordStore {
        const chars = word.toLowerCase().split('');

        return derived(alphabetStore, ($alphabet: Letter[]) => {
            const letters = $alphabet
                .filter(letter => {
                    return chars.includes(letter.getValue());
                })
                .reduce((map: {}, letter: Letter) => {
                    map[letter.getValue()] = letter;
                    return map;
                }, {});

            return chars.map(char => letters[char].isUsed() ? char : '_').join('');
        });
    }
}
