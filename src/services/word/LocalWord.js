import { Word } from './Word';

export class LocalWord extends Word {
    constructor() {
        super();
        this._data = 'https://raw.githubusercontent.com/micschwarz-data/German-English-JSON-Dictionary/master/english_german.json';
    }

    fetch = () => {
        return new Promise((resolve, reject) => {
            window.fetch(this._data)
                .then(response => response.json())
                .then(dict => Object.values(dict))
                .then(list => list.filter(word => !word.includes(' ')))
                .then(list => list.filter(word => word.charAt(0).toUpperCase() === word.charAt(0)))
                .then(list => list.filter(word => word.length < 7))
                .then(list => list.filter(word => /^[a-z]*$/gi.test(word)))
                .then(list => list[~~(list.length * Math.random())])
                .then(word => resolve(word))
                .catch(() => reject('ERR_FETCH'))
        });
    }
}
