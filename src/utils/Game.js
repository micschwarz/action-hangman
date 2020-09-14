import { lettersStore }                     from '../stores/letters';
import { wordStoreMaster, wordStorePlayer } from '../stores/word';
import { roundsStore }                      from '../stores/rounds';

export class Game {
    /**
     *
     * @param {Word} wordService
     */
    constructor(wordService) {
        lettersStore.reset();
        roundsStore.reset();

        wordService.fetch()
            .catch(err => {
                console.log(err);
            })
            .then(word => {
                wordStoreMaster.set(word)
            });

        this._lettersStore = lettersStore;
        this._wordStore = wordStorePlayer;
        this._roundsStore = roundsStore;
    }

    getLettersStore() {
        return this._lettersStore;
    };

    getWordStore() {
        return this._wordStore;
    };

    getRoundsStore() {
        return this._roundsStore;
    };

    useLetter(char) {
        this.getLettersStore().use(char);
        this.getRoundsStore().decrement();
    };
}
