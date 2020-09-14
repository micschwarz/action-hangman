export class Word {
    /**
     * Returns a random word.
     *
     * @returns {Promise<string>}
     */
    fetch() {
        return new Promise((resolve, reject) => {
            reject('No word source.')
        });
    }
}
