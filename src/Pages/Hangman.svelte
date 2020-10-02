<script lang="ts">
    import { Game, GameTypeIdentifier } from '../utils/Game';
    import { GameState, isFinished }    from '../stores/state';
    import LetterKeyboard               from '../Components/Hangman/LetterKeyboard.svelte';
    import Word                      from '../Components/Hangman/Word.svelte';
    import Rounds                    from '../Components/Hangman/Rounds.svelte';
    import WinPopup                  from '../Components/Popups/WinPopup.svelte';
    import LosePopup                 from '../Components/Popups/LosePopup.svelte';
    import LoaderPopup               from '../Components/Popups/LoaderPopup.svelte';
    import Actions                   from '../Components/Hangman/Actions.svelte';
    import ActionSnackbar            from '../Components/Snackbars/ActionSnackbar.svelte';
    import { getContext, onDestroy } from 'svelte';
    import OneVsOneResultPopup       from '../Components/Popups/OneVsOneResultPopup.svelte';
    import { open as openPopup }     from '../Components/Popups/PopupOutlet.svelte';
    import { get }                   from 'svelte/store';
    import { HideUsedAction }        from '../utils/Actions/Action/HideUsedAction';

    const user = getContext('user');

    export let game: Game;

    const stateStore      = game.getStateStore();
    const lettersStore    = game.getLettersStore();
    const actionsStore    = game.getActionsStore();
    const roundsStore     = game.getRoundsStore();
    const wordMasterStore = game.getWordMasterStore();
    const wordStore       = game.getWordStore();
    const wordFetchPopup  = game.getWordServicePopup();

    let currentAction = undefined;

    const setCurrentAction = (action) => {
        currentAction = action;
        setTimeout(() => {
            currentAction = undefined;
        }, 2000);
    };

    const useLetterHandler = (event) => {
        game.useLetter(event.detail.char);
    };

    game.onActionFire(setCurrentAction);

    const openMultiPlayerPopup = () => {
        openPopup(OneVsOneResultPopup, {
            rounds   : get(roundsStore),
            roundsMax: roundsStore.getMax(),
            word     : get(wordMasterStore),
            status   : get(stateStore),
            game     : game,
        });
    };

    const openLosePopup = (isMultiplayer) => {
        if (isMultiplayer) {
            return openMultiPlayerPopup();
        }
        openPopup(LosePopup, { roundsMax: roundsStore.getMax(), word: get(wordMasterStore) });
    };

    const openWinPopup = (isMultiplayer) => {
        if (isMultiplayer) {
            return openMultiPlayerPopup();
        }
        openPopup(WinPopup, { rounds: get(roundsStore), word: get(wordMasterStore) });
    };

    const unsubStatStore = stateStore.subscribe((state) => {
        const isMultiplayer = game.isMultiplayerGame();
        if (state === GameState.WIN) {
            openWinPopup(isMultiplayer);
        } else if (state === GameState.LOSE) {
            openLosePopup(isMultiplayer);
        }

        if (state === GameState.WIN && game.getGameType().countStats) {
            user.getStatisticsService().addGameWon();
        }

        if (state === GameState.LOSE && game.getGameType().countStats) {
            user.getStatisticsService().addGameLost();
        }
    });

    onDestroy(unsubStatStore);
</script>

<ActionSnackbar show={currentAction !== undefined} action={currentAction}/>

<svelte:component this={wordFetchPopup} show={$stateStore === GameState.LOADING} game={game}/>

<section>
    <header>
        <div class="word">
            <Word word={$wordStore}/>
        </div>

        <div class="rounds">
            {#if $stateStore !== GameState.LOADING}
                <Rounds max={roundsStore.getMax()} current={$roundsStore}/>
            {/if}
        </div>
    </header>

    <main>
        {#if $stateStore !== GameState.LOADING}
            <LetterKeyboard letters={$lettersStore} on:useLetter={useLetterHandler}/>
            <Actions actions={$actionsStore}/>
        {/if}
    </main>

</section>

<style>
    section {
        display               : grid;
        grid-template-rows    : auto auto;
        grid-template-columns : max-content;
        grid-template-areas   : "header" "main";
        justify-content       : center;

        padding               : 1rem;
        max-width             : 40rem;
        margin                : 0 auto;
    }

    main {
        grid-area : main;
    }

    header {
        grid-area             : header;

        display               : grid;
        grid-template-rows    : auto;
        grid-template-columns : auto 4rem;
        grid-template-areas   : "word rounds";
    }

    header .rounds {
        grid-area : rounds;
    }

    header .word {
        grid-area       : word;

        display         : flex;
        align-items     : center;
        justify-content : center;

        margin          : 0;
        text-align      : center;
    }
</style>
