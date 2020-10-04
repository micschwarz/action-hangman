import type { WordManager }                       from './WordManager';
import { LocalWord }                              from '../../services/word/LocalWord';
// @ts-ignore
import { open as openPopup, close as closePopup } from '../../Components/Popups/PopupOutlet.svelte';
import LoaderPopup                                from '../../Components/Popups/LoaderPopup.svelte';

export class SinglePlayerWordManager implements WordManager {
    fetch(): Promise<string> {
        openPopup(LoaderPopup);

        return new LocalWord()
            .fetch()
            .finally(() => closePopup(LoaderPopup));
    }
}
