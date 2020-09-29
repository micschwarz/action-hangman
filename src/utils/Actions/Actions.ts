import type { Action } from "./Action/Action";

export abstract class Actions {
    /**
     * Create all actions.
     */
    abstract get(): Action[];

    /**
     * Execute action update on all given actions.
     *
     * @param {Action[]} actions
     */
    static updateAll(actions: Action[]): Action[] {
        actions.forEach((action) => {
            action.update();
        });
        return actions;
    }
}
