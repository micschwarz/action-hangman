import type { WordManager }        from '../WordManager/WordManager';
import type { GameType }           from './GameType';
import type { Actions }            from '../Actions/Actions';
import type { GameState }          from '../GameState';
import { OnDeviceGameType }        from './OnDeviceGameType';
import { SinglePlayerWordManager } from '../WordManager/SinglePlayerWordManager';
import { AllActions }              from '../Actions/AllActions';

export class LocalGameType extends OnDeviceGameType {
    getActions(): Actions {
        return new AllActions();
    }

    getWordManager(): WordManager {
        return new SinglePlayerWordManager();
    }

    reinstanciate(): GameType {
        return new LocalGameType();
    }

    finish(gameState: GameState) {
        super.finish(gameState);
        // TODO Statistics
    }
}
