import type { GameType }               from './GameType';
import type { Actions }                from '../Actions/Actions';
import type { WordManager }            from '../WordManager/WordManager';
import { OnDeviceGameType }            from './OnDeviceGameType';
import { AllActions }                  from '../Actions/AllActions';
import { LocalMultiPlayerWordManager } from '../WordManager/LocalMultiPlayerWordManager';

export class LocalMultiPlayerGameType extends OnDeviceGameType {
    getActions(): Actions {
        return new AllActions();
    }

    getWordManager(): WordManager {
        return new LocalMultiPlayerWordManager();
    }

    reinstanciate(): GameType {
        return new LocalMultiPlayerGameType();
    }
}
