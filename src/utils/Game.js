import { lettersStore }                     from '../stores/letters';
import { wordStoreMaster, wordStorePlayer } from '../stores/word';

export class Game {
    /**
     *
     * @param {Word} wordService
     */
    constructor(wordService) {
        lettersStore.reset();

        wordService.fetch()
            .catch(err => {
                console.log(err);
            })
            .then(word => {
                wordStoreMaster.set(word)
            });

        this._lettersStore = lettersStore;
        this._wordStore = wordStorePlayer;
    }

    getLettersStore = () => {
        return this._lettersStore;
    };

    getWordStore = () => {
        return this._wordStore;
    }
}
