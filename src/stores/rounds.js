import { writable } from 'svelte/store';

const createRoundsStore = () => {
    const MAX_ROUNDS = 11;
    const { subscribe, update, set } = writable(0);

    return {
        subscribe,
        decrement: () => {
            update(rounds => Math.min(rounds + 1, MAX_ROUNDS));
        },
        reset    : () => {
            set(0)
        },
        getMax   : () => {
            return MAX_ROUNDS;
        }
    }
}

export const roundsStore = createRoundsStore();
