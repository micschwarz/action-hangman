import { HideLettersAction } from './HideLettersAction';
import { HideUsedAction }    from './HideUsedAction';

export class Actions {
    static get() {
        return [new HideLettersAction(), new HideUsedAction()];
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
