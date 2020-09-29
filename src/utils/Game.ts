import { lettersStore }                                     from '../stores/letters';
import { wordStoreMaster, wordStorePlayer }                 from '../stores/word';
import { roundsStore }                                      from '../stores/rounds';
import { STATE_LOSE, STATE_PLAYING, STATE_WIN, stateStore } from '../stores/state';
import { LocalWord }                                        from '../services/word/LocalWord';
import { actionsStore }                                     from '../stores/actions';
import { get }                                              from 'svelte/store';
import type { Action }                                      from './Actions/Action/Action';
import { LocalMultiplayerWord }                             from '../services/word/LocalMultiplayerWord';
import { AllActions }                                       from './Actions/AllActions';
import { ClassicActions }                                   from './Actions/ClassicActions';
import { OneVsOneWord }                                     from '../services/word/OneVsOneWord';

export enum GameTypeIdentifier {
    LOCAL             = 0,
    LOCAL_MULTIPLAYER = 1,
    CLASSIC           = 2,
    ONE_VS_ONE        = 3,
}

export interface GameType {
    name: string,
    description: string,
    icon: string,
    color: string,
    identifier: number,
    countStats: boolean,
}

const GAME_TYPE_DEFINITION = {
    0: {
        name         : 'Einzelspieler',
        description  : 'Spiele alleine',
        icon         : 'user',
        color        : 'yellow',
        identifier   : GameTypeIdentifier.LOCAL,
        wordService  : LocalWord,
        actions      : AllActions,
        countStats   : true,
        isMultiplayer: false,
    },
    1: {
        name         : 'Multiplayer Lokal',
        description  : 'Spiele zu zweit an einem Gerät',
        icon         : 'users-alt',
        color        : 'green',
        identifier   : GameTypeIdentifier.LOCAL_MULTIPLAYER,
        wordService  : LocalMultiplayerWord,
        actions      : AllActions,
        countStats   : false,
        isMultiplayer: false,
    },
    2: {
        name         : 'Klassik',
        description  : 'Klassisches Hangman, ohne Zusätze',
        icon         : 'clock-ten',
        color        : 'red',
        identifier   : GameTypeIdentifier.CLASSIC,
        wordService  : LocalWord,
        actions      : ClassicActions,
        countStats   : true,
        isMultiplayer: false,
    },
    3: {
        name         : 'One VS One',
        description  : 'Spiele gegen einen Mitstreiter',
        icon         : 'crosshair',
        color        : 'blue',
        identifier   : GameTypeIdentifier.ONE_VS_ONE,
        wordService  : OneVsOneWord,
        actions      : ClassicActions,
        countStats   : true,
        isMultiplayer: true,
    },
};

export class Game {

    private readonly _lettersStore                         = lettersStore;
    private readonly _wordStore                            = wordStorePlayer;
    private readonly _wordStoreMaster                      = wordStoreMaster;
    private readonly _roundsStore                          = roundsStore;
    private readonly _stateStore                           = stateStore;
    private readonly _actionsStore                         = actionsStore;
    private readonly _wordService;
    private _actionCallbacks: ((action: Action) => void)[] = [];
    private readonly gameType;

    private multiplayerDocument;
    private player1 = true;

    /**
     * Get game types.
     */
    static getGameTypes(): GameType[] {
        return Object.values(GAME_TYPE_DEFINITION);
    }

    /**
     * Creates game.
     */
    static start(gameType: GameTypeIdentifier = GameTypeIdentifier.LOCAL): Game {
        return new Game(gameType);
    }

    /**
     * Creates game.
     *
     */
    private constructor(gameType: GameTypeIdentifier) {
        this.gameType = GAME_TYPE_DEFINITION[gameType];

        const actions = new (this.gameType.actions)();

        lettersStore.reset();
        roundsStore.reset();
        actionsStore.set(actions.get());
        wordStoreMaster.set(''); // Loading

        this._wordService = new (this.gameType.wordService)(this);
        this._wordService.fetch()
            .then(word => {
                wordStoreMaster.set(word);
            })
            .catch(err => {
                console.log(err);
            });
    }

    /**
     * Get current game type.
     */
    getGameType(): GameType {
        return this.gameType;
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
        }

        const round = get(this.getRoundsStore());

        // Not in last round
        if (round < this.getRoundsStore().getMax()) {
            this.runRandomAction(0.1);
        }

        if (this.isMultiplayerGame() && get(this.getStateStore()) !== STATE_PLAYING) {
            this.getWordService().setRounds(round);
        }
    };

    setMultiplayerDocument(document, isPlayer1: boolean) {
        this.multiplayerDocument = document;
        this.player1             = isPlayer1;
    }

    getMultiplayerDocument() {
        return this.multiplayerDocument;
    }

    isMultiplayerGame(): boolean {
        return this.gameType.isMultiplayer;
    }

    isPlayer1(): boolean {
        return this.player1;
    }

    /**
     * Register callback triggered on action fire.
     *
     * @param fn
     */
    onActionFire(fn: (action: Action) => void) {
        this._actionCallbacks.push(fn);
    };

    /**
     * Runs random action.
     *
     * @param probability
     * @private
     */
    private runRandomAction(probability: number) {
        const actionsStore      = this.getActionsStore();
        const actions: Action[] = get(actionsStore).filter(action => action.canRun() && !action.didRun());

        if (actions.length > 0 && Math.random() <= probability) {
            const action = actions[~~(actions.length * Math.random())];
            actionsStore.run(action);
            this._actionCallbacks.forEach((fn) => fn(action));
        }
    }
}
