import type { GameState }              from '../GameState';
import type { Actions }                from '../Actions/Actions';
import type { WordManager }            from '../WordManager/WordManager';
import type { GameType }               from './GameType';
import { ClassicActions }              from '../Actions/ClassicActions';
import { OneVsOneWordManager, Player } from '../WordManager/OneVsOneWordManager';
// @ts-ignore
import { open as openPopup }           from '../../Components/Popups/PopupOutlet.svelte';
import OneVsOneResultPopup             from '../../Components/Popups/OneVsOneResultPopup.svelte';

export class OneVsOneGameType implements GameType {

    private wordManager: OneVsOneWordManager;

    finish(gameState: GameState): void {
        const update = {};

        if (this.wordManager.getPlayer() === Player.ONE) {
            update['roundsPlayer1'] = gameState.getRound();
        } else {
            update['roundsPlayer2'] = gameState.getRound();
        }

        this.wordManager.getGameDocument().set(update, { merge: true });
        openPopup(
            OneVsOneResultPopup,
            {
                game     : this.wordManager.getGameDocument(),
                roundsMax: gameState.getRoundsStore().getMax(),
                rounds   : gameState.getRound(),
                status   : gameState.getState(),
                word     : gameState.getWord(),
            });
    }

    getActions(): Actions {
        return new ClassicActions();
    }

    getWordManager(): WordManager {
        this.wordManager = new OneVsOneWordManager();
        return this.wordManager;
    }

    reinstanciate(): GameType {
        return new OneVsOneGameType();
    }

}
