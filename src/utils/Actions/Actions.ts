import { HideLettersAction } from './HideLettersAction';
import { HideUsedAction } from './HideUsedAction';
import { RandomLetterAction } from './RandomLetterAction';
import type { Action } from "./Action";

export class Actions {
    static get(): Action[] {
        return [new HideLettersAction(), new HideUsedAction(), new RandomLetterAction()];
    }

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
