import type { WordManager }         from '../WordManager/WordManager';
import type { GameState }           from '../GameState';
import type { Actions }             from '../Actions/Actions';
import { LocalGameType }            from './LocalGameType';
import { ClassicGameType }          from './ClassicGameType';
import { LocalMultiPlayerGameType } from './LocalMultiPlayerGameType';
import { OneVsOneGameType }         from './OneVsOneGameType';

export const GameTypes = {
    LOCAL      : {
        name       : 'Einzelspieler',
        description: 'Spiele alleine',
        icon       : 'user',
        color      : 'yellow',
        type       : LocalGameType,
    },
    LOCAL_MULTI: {
        name       : 'Multiplayer Lokal',
        description: 'Spiele zu zweit an einem Gerät',
        icon       : 'users-alt',
        color      : 'green',
        type       : LocalMultiPlayerGameType,
    },
    CLASSIC    : {
        name       : 'Klassik',
        description: 'Klassisches Hangman, ohne Zusätze',
        icon       : 'clock-ten',
        color      : 'red',
        type       : ClassicGameType,
    },
    ONE_V_ONE  : {
        name       : 'One VS One',
        description: 'Spiele gegen einen Mitstreiter',
        icon       : 'crosshair',
        color      : 'blue',
        type       : OneVsOneGameType,
    },
};

export interface GameType {
    /**
     * Get word manager.
     */
    getWordManager(): WordManager;

    /**
     * Get actions used for game.
     */
    getActions(): Actions;

    /**
     * Shows game result.
     * @param gameState - State the game is finished with.
     */
    finish(gameState: GameState): void;

    /**
     * Create a new instance of this type.
     */
    reinstanciate(): GameType;
}
