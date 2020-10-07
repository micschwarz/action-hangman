import type { WordManager }        from '../WordManager/WordManager';
import type { GameType }           from './GameType';
import type { Actions }            from '../Actions/Actions';
import type { GameState }          from '../GameState';
import { OnDeviceGameType }        from './OnDeviceGameType';
import { SinglePlayerWordManager } from '../WordManager/SinglePlayerWordManager';
import { ClassicActions }          from '../Actions/ClassicActions';
import { State }                   from '../GameState';
import { currentUser }             from '../../services/user/User';
// @ts-ignore
import { addXP }                   from '../../Components/ExperienceAdd.svelte';

export class ClassicGameType extends OnDeviceGameType {
    getActions(): Actions {
        return new ClassicActions();
    }

    getWordManager(): WordManager {
        return new SinglePlayerWordManager();
    }

    reinstanciate(): GameType {
        return new ClassicGameType();
    }

    finish(gameState: GameState) {
        super.finish(gameState);
        const xpIncrease = gameState.getState() === State.WON ? 35 : 15;
        currentUser.getStatisticsService().getExperienceStore().increment(xpIncrease)
            .then(() => addXP(xpIncrease));
    }
}
