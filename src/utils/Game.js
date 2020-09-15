import { lettersStore }                     from '../stores/letters';
import { wordStoreMaster, wordStorePlayer } from '../stores/word';
import { roundsStore }                      from '../stores/rounds';
import { stateStore }                       from '../stores/state';
import { LocalWord }                        from '../services/word/LocalWord';

export class Game {

    static start() {
        return new Game(new LocalWord());
    }

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
        this._wordStoreMaster = wordStoreMaster;
        this._roundsStore = roundsStore;
        this._stateStore = stateStore;
    }

    getLettersStore() {
        return this._lettersStore;
    };

    getWordStore() {
        return this._wordStore;
    };

    getWordMasterStore() {
        return this._wordStoreMaster;
    };

    getStateStore() {
        return this._stateStore;
    };

    getRoundsStore() {
        return this._roundsStore;
    };

    useLetter(char) {
        this.getLettersStore().use(char);
        this.getRoundsStore().decrement();
    };
}
