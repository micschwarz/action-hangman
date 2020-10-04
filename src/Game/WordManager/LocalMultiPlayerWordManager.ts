import type { WordManager }                       from './WordManager';
// @ts-ignore
import { open as openPopup, close as closePopup } from '../../Components/Popups/PopupOutlet.svelte';
import WordInputPopup                             from '../../Components/Popups/WordInputPopup.svelte';

export class LocalMultiPlayerWordManager implements WordManager {
    fetch(): Promise<string> {
        return new Promise<string>(resolve => {
            openPopup(WordInputPopup, { resolve });
        }).finally(() => closePopup(WordInputPopup));
    }
}
