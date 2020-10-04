import type { GameType }     from './GameType';
import type { WordManager }  from '../WordManager/WordManager';
import type { Actions }      from '../Actions/Actions';
import { GameState, State }  from '../GameState';
// @ts-ignore
import { open as openPopup } from '../../Components/Popups/PopupOutlet.svelte';
import WinPopup              from '../../Components/Popups/WinPopup.svelte';
import LosePopup             from '../../Components/Popups/LosePopup.svelte';

export abstract class OnDeviceGameType implements GameType {
    abstract getWordManager(): WordManager;

    finish(gameState: GameState): void {
        const roundsMax = gameState.getRoundsStore().getMax();
        const rounds    = gameState.getRound();
        const word      = gameState.getWord();

        if (gameState.getState() === State.WON) {
            openPopup(WinPopup, { rounds, word });
        }

        if (gameState.getState() === State.LOST) {
            openPopup(LosePopup, { roundsMax, word });
        }
    }

    abstract getActions(): Actions;

    abstract reinstanciate(): GameType;
}
