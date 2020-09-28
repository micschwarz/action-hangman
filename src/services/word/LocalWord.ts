import type { Word } from "./Word";
import LoaderPopup from '../../Components/Popups/LoaderPopup.svelte';

export class LocalWord implements Word {
    private readonly data = 'https://raw.githubusercontent.com/micschwarz-data/German-English-JSON-Dictionary/master/english_german.json';

    fetch(): Promise<string> {
        return new Promise((resolve, reject) => {
            window.fetch(this.data)
                .then(response => response.json())
                .then((dict): string[] => Object.values(dict))
                .then(list => list.filter(word => !word.includes(' ')))
                .then(list => list.filter(word => word.charAt(0).toUpperCase() === word.charAt(0)))
                .then(list => list.filter(word => word.length < 6))
                .then(list => list.filter(word => /^[a-z]*$/gi.test(word)))
                .then(list => list[~~(list.length * Math.random())])
                .then(word => resolve(word))
                .catch(() => reject('ERR_FETCH'))
        });
    }

    getAwaitPopup(): any {
        return LoaderPopup;
    }
}
