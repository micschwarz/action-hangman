import { Letter } from "./Letter";

export default class Alphabet {
    /**
     * Generate alphabet.
     *
     * @param {string[]} [used=[]] - Letters already used.
     * @returns {Letter[]}
     */
    static generate(used: string[] = []): string[] {
        const alphabet = [];

        const asciiCodeA = 'a'.charCodeAt(0);
        const asciiCodeZ = 'z'.charCodeAt(0);

        for (let code = asciiCodeA; code <= asciiCodeZ; code++) {
            const letter = String.fromCharCode(code);
            if (!used.includes(letter)) {
                alphabet.push(new Letter(letter));
            }
        }

        return alphabet;
    }

    /**
     * Checks if character is in default alphabet.
     *
     * @param {string} char
     * @returns {boolean}
     */
    static validate(char: string): boolean {
        const asciiCodeA = 'a'.charCodeAt(0);
        const asciiCodeZ = 'z'.charCodeAt(0);
        const charCode = char.charCodeAt(0);
        return char.length === 1 && charCode >= asciiCodeA && charCode <= asciiCodeZ;
    }
}

