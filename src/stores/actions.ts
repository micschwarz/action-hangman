import { writable } from 'svelte/store';
import { Actions }  from '../utils/Actions/Actions';

const createActionsStore = () => {
    const { set, update, subscribe } = writable([]);

    return {
        subscribe,
        reset : () => {
            set(Actions.get());
        },
        update: () => {
            update((actions) => Actions.updateAll(actions));
        },
        run   : (action) => {
            action.execute();
            update((actions) => actions);
        }
    }
}

export const actionsStore = createActionsStore();
