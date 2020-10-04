import type { Game }   from '../Game';
import type { Action } from './Action/Action';

export abstract class Actions {
    /**
     * Create all actions.
     */
    abstract get(): Action[];

    /**
     * Execute action update on all given actions.
     *
     * @param {Action[]} actions
     * @param game
     */
    static updateAll(actions: Action[], game: Game): Action[] {
        actions.forEach((action) => {
            action.update(game);
        });
        return actions;
    }
}
