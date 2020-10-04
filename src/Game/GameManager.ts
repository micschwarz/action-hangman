import type { GameType } from './GameType/GameType';
import { Game }          from './Game';

export class GameManager {

    /**
     * Current game type.
     * @private
     */
    private type: GameType;

    /**
     * Start game with given type.
     *
     * @param gameType
     */
    start(gameType: GameType): Promise<Game> {
        return new Promise(async (resolve) => {
            const game = await Game.create(gameType);
            this.type  = gameType;
            resolve(game);
        });

    }

    /**
     * Restart game with current game type.
     */
    restart(): Promise<Game> {
        const reinstancedType = this.type.reinstanciate();
        return this.start(reinstancedType);
    }
}
