import { Actions }            from "./Actions";
import type { Action }        from "./Action/Action";
import { HideLettersAction }  from "./Action/HideLettersAction";
import { HideUsedAction }     from "./Action/HideUsedAction";
import { RandomLetterAction } from "./Action/RandomLetterAction";

export class AllActions extends Actions {
    get(): Action[] {
        return [new HideLettersAction(), new HideUsedAction(), new RandomLetterAction()];
    }
}
