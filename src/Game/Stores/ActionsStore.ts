import type { Action }        from '../Actions/Action/Action';
import type { Game }          from '../Game';
import { Readable, writable } from 'svelte/store';
import { Actions }            from '../Actions/Actions';

export interface ActionsStore extends Readable<Action[]> {
    update(game: Game): void;

    fire(action: Action, onGame: Game): void;
}

export class ActionsStoreFactory {
    static create(actions: Actions): ActionsStore {
        const { subscribe, update } = writable<Action[]>(actions.get());

        return {
            subscribe,
            update(game: Game) {
                update(actions => Actions.updateAll(actions, game));
            },
            fire(action: Action, onGame: Game) {
                action.execute(onGame);
                update(actions => actions);
            },
        };
    }
}
