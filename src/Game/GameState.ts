import type { GameType }                   from './GameType/GameType';
import type { WordStore }                  from './Stores/WordStore';
import { RoundsStore, RoundsStoreFactory } from './Stores/RoundsStore';
import { get }                             from 'svelte/store';

export enum State {
    RUNNING,
    LOST,
    WON
}

export class GameState {
    /**
     * Game type.
     *
     * @private
     */
    private readonly gameType: GameType;

    /**
     * Rounds store.
     *
     * @private
     */
    private readonly roundsStore: RoundsStore;

    /**
     * Word store.
     *
     * @private
     */
    private readonly wordStore: WordStore;

    /**
     * Word.
     *
     * @private
     */
    private readonly word: string;

    /**
     * Current game state.
     *
     * @private
     */
    private state: State = State.RUNNING;

    constructor(gameType: GameType, word: string, wordStore: WordStore) {
        this.gameType    = gameType;
        this.roundsStore = RoundsStoreFactory.create();
        this.wordStore   = wordStore;
        this.word        = word;
    }

    /**
     * Get rounds store.
     */
    getRoundsStore(): RoundsStore {
        return this.roundsStore;
    }

    /**
     * Get word.
     */
    getWord(): string {
        return this.word;
    }

    /**
     * Get current state.
     */
    getState(): State {
        return this.state;
    }

    /**
     * Get current round.
     */
    getRound(): number {
        return get(this.roundsStore);
    }

    /**
     * Increment round.
     */
    incrementRound(): void {
        const won = get(this.wordStore) === this.word.toLowerCase();

        if (!this.roundsStore.increment() || won) {
            this.state = won ? State.WON : State.LOST;

            this.gameType.finish(this);
        }
    }
}
