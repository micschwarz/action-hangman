export interface Word {
    /**
     * Returns a random word.
     */
    fetch(): Promise<string>;
}
