import { Actions }     from './Actions';
import type { Action } from './Action/Action';

export class ClassicActions extends Actions {
    get(): Action[] {
        return [];
    }
}
