import { lettersStore } from '../stores/letters';
import { wordStoreMaster, wordStorePlayer } from '../stores/word';
import { roundsStore } from '../stores/rounds';
import { stateStore } from '../stores/state';
import { LocalWord } from '../services/word/LocalWord';
import { actionsStore } from '../stores/actions';
import { get } from 'svelte/store';
import type { Word } from "../services/word/Word";
import type { Action } from "./Actions/Action";
import { LocalMultiplayerWord } from "../services/word/LocalMultiplayerWord";

export enum GameType {
    LOCAL             = 0,
    LOCAL_MULTIPLAYER = 1,
}

export class Game {

    private readonly _lettersStore = lettersStore;
    private readonly _wordStore = wordStorePlayer;
    private readonly _wordStoreMaster = wordStoreMaster;
    private readonly _roundsStore = roundsStore;
    private readonly _stateStore = stateStore;
    private readonly _actionsStore = actionsStore;
    private readonly _wordService;
    private _actionCallbacks: ((action: Action) => void)[] = [];

    /**
     * Creates game.
     */
    static start(gameType: GameType = GameType.LOCAL): Game {
        let wordService;

        switch (gameType) {
            case GameType.LOCAL:
                wordService = new LocalWord();
                break;
            case GameType.LOCAL_MULTIPLAYER:
                wordService = new LocalMultiplayerWord();
                break;
            default:
                wordService = new LocalWord();
                break;
        }

        return new Game(wordService);
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

        this._wordService = wordService;
        this._wordService.fetch()
            .then(word => {
                wordStoreMaster.set(word)
            })
            .catch(err => {
                console.log(err);
            });
    }

    /**
     * Get letters store.
     */
    getLettersStore() {
        return this._lettersStore;
    };

    /**
     * Get word store.
     */
    getWordStore() {
        return this._wordStore;
    };

    /**
     * Get master word store.
     */
    getWordMasterStore() {
        return this._wordStoreMaster;
    };

    /**
     * Get state store.
     */
    getStateStore() {
        return this._stateStore;
    };

    /**
     * Get rounds store.
     */
    getRoundsStore() {
        return this._roundsStore;
    };

    /**
     * Get actions store.
     */
    getActionsStore() {
        return this._actionsStore;
    };

    /**
     * Get Popup from word service.
     */
    getWordServicePopup() {
        return this._wordService.getAwaitPopup();
    };

    /**
     * Get word service.
     */
    getWordService() {
        return this._wordService;
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

    /**
     * Register callback triggered on action fire.
     *
     * @param fn
     */
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
