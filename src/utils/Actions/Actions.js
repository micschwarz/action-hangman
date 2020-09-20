import { HideLettersAction }  from './HideLettersAction';
import { HideUsedAction }     from './HideUsedAction';
import { RandomLetterAction } from './RandomLetterAction';

export class Actions {
    static get() {
        return [new HideLettersAction(), new HideUsedAction(), new RandomLetterAction()];
    }

    /**
     * Execute action update on all given actions.
     *
     * @param {Action[]} actions
     */
    static updateAll(actions) {
        actions.forEach((action) => {
            action.update();
        });
        return actions;
    }
}
