export class Shuffler {
    /**
     * Random sort arrays.
     * Algorithm: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Fisher_and_Yates'_original_method
     *
     * @param a
     */
    static random<T>(a: T[]): T[] {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            [a[j], a[i]] = [a[i], a[j]];
        }
        return a;
    }
}
