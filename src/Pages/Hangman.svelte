<script lang="ts">
    import { Game, GameType }                       from '../utils/Game';
    import { STATE_LOSE, STATE_WIN, STATE_LOADING } from '../stores/state';
    import LetterKeyboard                           from '../Components/Hangman/LetterKeyboard.svelte';
    import Word                                     from '../Components/Hangman/Word.svelte';
    import Rounds                                   from '../Components/Hangman/Rounds.svelte';
    import WinPopup                                 from '../Components/Popups/WinPopup.svelte';
    import LosePopup                                from '../Components/Popups/LosePopup.svelte';
    import LoaderPopup                              from '../Components/Popups/LoaderPopup.svelte';
    import Actions                                  from '../Components/Hangman/Actions.svelte';
    import ActionSnackbar                           from '../Components/Snackbars/ActionSnackbar.svelte';
    import { onDestroy }                            from 'svelte';

    export let location;
    export let user;
    let gameType = parseInt(location.state[0]);

    let game = Game.start(gameType);

    const stateStore = game.getStateStore();
    const lettersStore = game.getLettersStore();
    const actionsStore = game.getActionsStore();
    const roundsStore = game.getRoundsStore();
    const wordMasterStore = game.getWordMasterStore();
    const wordStore = game.getWordStore();
    const wordFetchPopup = game.getWordServicePopup();

    let currentAction = undefined;

    const setCurrentAction = (action) => {
        currentAction = action;
        setTimeout(() => {
            currentAction = undefined;
        }, 2000)
    }

    const restartGame = () => {
        game = Game.start(gameType);
        game.onActionFire(setCurrentAction);
    }

    const useLetterHandler = (event) => {
        game.useLetter(event.detail.char);
    }

    game.onActionFire(setCurrentAction);

    const unsubStatStore = stateStore.subscribe((state) => {
        if (state === STATE_WIN && gameType === GameType.LOCAL) {
            user.getStatisticsService().addGameWon();
        }

        if (state === STATE_LOSE && gameType === GameType.LOCAL) {
            user.getStatisticsService().addGameLost();
        }
    });

    onDestroy(unsubStatStore);
</script>

<ActionSnackbar show={currentAction !== undefined} action={currentAction}/>

<WinPopup
        on:restart={restartGame}
        show={$stateStore === STATE_WIN}
        rounds={$roundsStore}
        word={$wordMasterStore}
/>

<LosePopup
        on:restart={restartGame}
        show={$stateStore === STATE_LOSE}
        roundsMax={roundsStore.getMax()}
        word={$wordMasterStore}
/>

<svelte:component this={wordFetchPopup} show={$stateStore === STATE_LOADING} {game}/>

<section>
    <header>
        <div class="word">
            <Word word={$wordStore}/>
        </div>

        <div class="rounds">
            {#if $stateStore !== STATE_LOADING}
                <Rounds max={roundsStore.getMax()} current={$roundsStore}/>
            {/if}
        </div>
    </header>

    <main>
        {#if $stateStore !== STATE_LOADING}
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
