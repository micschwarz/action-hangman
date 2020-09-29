import type { Word } from './Word';
import type { User } from '../user/User';

export interface MultiplayerWord extends Word {
    /**
     * Join a game.
     *
     * @param user
     * @param gameId
     */
    joinGame(user: User, gameId: string): Promise<undefined>;

    /**
     * Create a game.
     *
     * @param user
     */
    createGame(user: User): Promise<string>;

    setRounds(rounds: number);
}
