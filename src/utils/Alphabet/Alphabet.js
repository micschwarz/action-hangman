import { Letter } from './Letter';

export default Alphabet

class Alphabet {
    /**
     * Generate alphabet
     * @param {string[]} [used=[]] - Letters already used.
     * @returns {Letter[]}
     */
    static generate(used = []) {
        const alphabet = [];

        const asciiCodeA = 'a'.charCodeAt(0);
        const asciiCodeZ = 'z'.charCodeAt(0)
        for (let code = asciiCodeA; code <= asciiCodeZ; code++) {
            const letter = String.fromCharCode(code);
            if (!used.includes(letter)) {
                alphabet.push(new Letter(letter));
            }
        }

        return alphabet;
    }
}

