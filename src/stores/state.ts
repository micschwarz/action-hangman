import { derived }                          from 'svelte/store';
import { wordStoreMaster, wordStorePlayer } from './word';
import { roundsStore }                      from './rounds';


export const STATE_PLAYING = 0;
export const STATE_WIN     = 1;
export const STATE_LOSE    = 2;
export const STATE_LOADING = 3;


export enum GameState {
    PLAYING = 0,
    WIN     = 1,
    LOSE    = 2,
    LOADING = 3,
}

export const isFinished = (state: GameState) => state === GameState.WIN || state === GameState.LOSE;

const createStateStore = () => {
    return derived(
        [roundsStore, wordStoreMaster, wordStorePlayer],
        ([$rounds, $wordMaster, $wordPlayer]) => {
            if ($wordMaster.length <= 0) {
                return GameState.LOADING;
            }

            if ($wordMaster.toLowerCase() === $wordPlayer.toLowerCase()) {
                return GameState.WIN;
            }

            if ($rounds < roundsStore.getMax()) {
                return GameState.PLAYING;
            }

            return GameState.LOSE;
        },
    );
};

export const stateStore = createStateStore();
