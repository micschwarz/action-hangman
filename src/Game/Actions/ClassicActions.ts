import type { Action } from './Action/Action';
import { Actions }     from './Actions';

export class ClassicActions extends Actions {
    get(): Action[] {
        return [];
    }
}
