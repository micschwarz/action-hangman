import { lettersStore } from '../stores/letters';
import { wordStoreMaster, wordStorePlayer } from '../stores/word';
import { roundsStore } from '../stores/rounds';
import { stateStore } from '../stores/state';
import { LocalWord } from '../services/word/LocalWord';
import { actionsStore } from '../stores/actions';
import { get } from 'svelte/store';
import type { Word } from "../services/word/Word";
import type { Action } from "./Actions/Action";

export class Game {

    private readonly _lettersStore = lettersStore;
    private readonly _wordStore = wordStorePlayer;
    private readonly _wordStoreMaster = wordStoreMaster;
    private readonly _roundsStore = roundsStore;
    private readonly _stateStore = stateStore;
    private readonly _actionsStore = actionsStore;
    private _actionCallbacks: ((action: Action) => void)[] = [];

    /**
     * Creates game.
     */
    static start(): Game {
        return new Game(new LocalWord());
    }

    /**
     * Creates game.
     *
     * @param {Word} wordService
     */
    private constructor(wordService: Word) {
        lettersStore.reset();
        roundsStore.reset();
        actionsStore.reset();
        wordStoreMaster.set(""); // Loading

        wordService.fetch()
            .then(word => {
                wordStoreMaster.set(word)
            })
            .catch(err => {
                console.log(err);
            });
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

    /**
     * Use letter.
     *
     * @param char
     */
    useLetter(char: string) {
        if (this.getLettersStore().use(char)) {
            this.getRoundsStore().decrement();
            this.getActionsStore().update();
            this.runRandomAction(0.1);
        }
    };

    onActionFire(fn: (action: Action) => void) {
        this._actionCallbacks.push(fn)
    };

    /**
     * Runs random action.
     *
     * @param probability
     * @private
     */
    private runRandomAction(probability: number) {
        const actionsStore = this.getActionsStore();
        const actions: Action[] = get(actionsStore).filter(action => action.canRun() && !action.didRun());

        if (actions.length > 0 && Math.random() <= probability) {
            const action = actions[~~(actions.length * Math.random())];
            actionsStore.run(action);
            this._actionCallbacks.forEach((fn) => fn(action));
        }
    }
}
