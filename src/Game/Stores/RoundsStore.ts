import type { Readable } from 'svelte/store';
import { get, writable } from 'svelte/store';

export interface RoundsStore extends Readable<number> {
    /**
     * Increment round count.
     */
    increment(): boolean;

    /**
     * Get maximum amount of rounds.
     */
    getMax(): number;
}

export class RoundsStoreFactory {

    /**
     * Maximum amount of rounds.
     * @private
     */
    private static readonly MAX_ROUNDS = 11;

    /**
     * Create rounds store
     */
    static create(): RoundsStore {
        const { subscribe, update } = writable<number>(0);
        return {
            subscribe,
            increment(): boolean {
                update(rounds => rounds + 1);

                return get(this) < RoundsStoreFactory.MAX_ROUNDS;
            },
            getMax(): number {
                return RoundsStoreFactory.MAX_ROUNDS;
            },
        };
    }
}
