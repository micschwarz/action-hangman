import type { Letter }        from '../Alphabet/Letter';
import Alphabet               from '../Alphabet/Alphabet';
import { Readable, writable } from 'svelte/store';

export interface AlphabetStore extends Readable<Letter[]> {
    /**
     * Use character.
     *
     * @param char
     */
    use(char: string): boolean;

    /**
     * Modify characters.
     *
     * @param fn
     */
    modify(fn: (letters: Letter[]) => Letter[]): void;
}

export class AlphabetStoreFactory {
    /**
     * Create alphabet store.
     *
     * @private
     */
    static create(): AlphabetStore {
        const alphabet = Alphabet.generate();

        const { subscribe, update } = writable<Letter[]>(alphabet);

        return {
            subscribe,
            use(char: string) {
                let didUpdate = false;

                const updater = (letters) => {
                    letters.forEach((letter) => {
                        if (letter.equals(char)) {
                            didUpdate = !letter.isUsed();
                            letter.setUsed(true);
                        }
                    });

                    return letters;
                };

                update(updater);

                return didUpdate;
            },
            modify(fn: (letters: Letter[]) => Letter[]) {
                update((letters) => fn(letters));
            },
        };
    }
}
