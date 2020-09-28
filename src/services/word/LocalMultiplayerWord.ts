import WordInputPopup from '../../Components/Popups/WordInputPopup.svelte';
import type { Word } from "./Word";

export class LocalMultiplayerWord implements Word {

    private resolve;

    fetch(): Promise<string> {
        return new Promise((resolve) => {
            this.resolve = resolve;
        });
    }

    getAwaitPopup() {
        return WordInputPopup;
    }

    /**
     * Resolve word.
     * Used in Popup.
     *
     * @param word
     */
    resolveWord(word: string) {
        this.resolve(word);
    }
}
