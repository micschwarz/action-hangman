import { Game }          from './Game';
import { writable }      from 'svelte/store';
import type { Readable } from 'svelte/store';

interface GameStore extends Readable<Game> {
}

interface GameStoreOpen extends GameStore {
    start(gameTypeId: number)
}

export class GameManager {
    private readonly currentGame: GameStoreOpen;
    private currentGameTypeId: number;

    constructor() {
        const { subscribe, set } = writable(undefined);

        this.currentGame = {
            subscribe,
            start: (gameTypeId: number) => {
                set(Game.start(gameTypeId));
            },
        };

    }

    start(gameTypeIdentifier: number) {
        this.currentGameTypeId = gameTypeIdentifier;
        this.currentGame.start(gameTypeIdentifier);
    }

    restart() {
        this.currentGame.start(this.currentGameTypeId);
    }

    getCurrentGame(): GameStore {
        return this.currentGame;
    }
}
