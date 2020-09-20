import { derived }                          from 'svelte/store';
import { wordStoreMaster, wordStorePlayer } from './word';
import { roundsStore }                      from './rounds';


export const STATE_PLAYING = 0;
export const STATE_WIN = 1;
export const STATE_LOSE = 2;
export const STATE_LOADING = 3;

const createStateStore = () => {
    return derived(
        [roundsStore, wordStoreMaster, wordStorePlayer],
        ([$rounds, $wordMaster, $wordPlayer,]) => {
            if ($wordMaster.length <= 0) {
                return STATE_LOADING;
            }

            if ($wordMaster.toLowerCase() === $wordPlayer.toLowerCase()) {
                return STATE_WIN;
            }

            if ($rounds < roundsStore.getMax()) {
                return STATE_PLAYING;
            }

            return STATE_LOSE;
        }
    )
}

export const stateStore = createStateStore();
