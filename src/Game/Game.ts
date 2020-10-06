import type { Action }                         from './Actions/Action/Action';
import type { GameType }                       from './GameType/GameType';
import { AlphabetStore, AlphabetStoreFactory } from './Stores/AlphabetStore';
import { WordStore, WordStoreFactory }         from './Stores/WordStore';
import { ActionsStore, ActionsStoreFactory }   from './Stores/ActionsStore';
import { GameState }                           from './GameState';
import { get }                                 from 'svelte/store';

type ActionCallback = (action: Action) => void;

export class Game {
    private readonly wordStore: WordStore;
    private readonly alphabetStore: AlphabetStore;
    private readonly actionsStore: ActionsStore;
    private readonly gameState: GameState;
    private actionCallbacks: ActionCallback[] = [];

    /**
     * Create a game with given type.
     *
     * @param gameType
     */
    static create(gameType: GameType): Promise<Game> {
        return gameType.getWordManager()
            .fetch()
            .then((word) => {
                const alphabetStore = AlphabetStoreFactory.create();
                const actionsStore  = ActionsStoreFactory.create(gameType.getActions());
                const wordStore     = WordStoreFactory.create(word, alphabetStore);
                const gameState     = new GameState(gameType, word, wordStore);

                return new Game(alphabetStore, wordStore, actionsStore, gameState);
            });
    }

    private constructor(
        alphabetStore: AlphabetStore,
        wordStore: WordStore,
        actionsStore: ActionsStore,
        gameState: GameState,
    ) {
        this.alphabetStore = alphabetStore;
        this.wordStore     = wordStore;
        this.actionsStore  = actionsStore;
        this.gameState     = gameState;
    }

    /**
     * Register action callback.
     *
     * @param fn
     */
    registerActionCallback(fn: ActionCallback): void {
        this.actionCallbacks.push(fn);
    }

    /**
     * Get alphabet store.
     */
    getAlphabetStore(): AlphabetStore {
        return this.alphabetStore;
    }

    /**
     * Get wird store.
     */
    getWordStore(): WordStore {
        return this.wordStore;
    }

    /**
     * Get actions store.
     */
    getActionsStore(): ActionsStore {
        return this.actionsStore;
    }

    /**
     * Get game state.
     */
    getGameState(): GameState {
        return this.gameState;
    }

    use(char: string): void {
        this.getAlphabetStore().use(char);
        this.getGameState().incrementRound();
        this.getActionsStore().update(this);

        if (this.getGameState().getRound() < this.getGameState().getRoundsStore().getMax()) {
            this.runRandomAction(0.1);
        }
    }

    /**
     * Runs random action.
     *
     * @param probability
     * @private
     */
    private runRandomAction(probability: number) {
        const actionsStore      = this.getActionsStore();
        const actions: Action[] = get<Action[], ActionsStore>(actionsStore)
            .filter(action => action.canRun() && !action.didRun());

        if (actions.length > 0 && Math.random() <= probability) {
            const action = actions[~~(actions.length * Math.random())];
            actionsStore.fire(action, this);
            this.actionCallbacks.forEach((fn) => fn(action));
        }
    }
}
