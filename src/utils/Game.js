import { lettersStore }                     from '../stores/letters';
import { wordStoreMaster, wordStorePlayer } from '../stores/word';
import { roundsStore }                      from '../stores/rounds';
import { stateStore }                       from '../stores/state';
import { LocalWord }                        from '../services/word/LocalWord';
import { actionsStore }                     from '../stores/actions';
import { get }                              from 'svelte/store';

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
        actionsStore.reset();

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
        this._actionsStore = actionsStore;
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

    getActionsStore() {
        return this._actionsStore;
    };

    useLetter(char) {
        this.getLettersStore().use(char);
        this.getRoundsStore().decrement();
        this.getActionsStore().update();
        this._runRandomAction(0.1);
    };

    _runRandomAction(probability) {
        const actionsStore = this.getActionsStore();
        const actions = get(actionsStore).filter(action => action.canRun() && !action.didRun());

        if (actions.length > 0 && Math.random() <= probability) {
            actionsStore.run(actions[~~(actions.length * Math.random())]);
        }
    }
}
