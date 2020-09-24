<script lang="ts">
    import { Game }                  from './utils/Game';
    import { STATE_LOSE, STATE_WIN } from './stores/state';
    import { STATE_LOADING }         from './stores/state';
    import LetterKeyboard            from './components/LetterKeyboard.svelte';
    import Word                      from './components/Word.svelte';
    import Rounds                    from './components/Rounds.svelte';
    import WinPopup                  from './components/popups/WinPopup.svelte';
    import LosePopup                 from './components/popups/LosePopup.svelte';
    import LoaderPopup               from './components/popups/LoaderPopup.svelte';
    import Actions                   from './components/Actions.svelte';
    import ActionPopup               from './components/popups/ActionPopup.svelte';

    let game = Game.start();

    const stateStore = game.getStateStore();
    const lettersStore = game.getLettersStore();
    const actionsStore = game.getActionsStore();
    const roundsStore = game.getRoundsStore();
    const wordMasterStore = game.getWordMasterStore();
    const wordStore = game.getWordStore();

    let currentAction = undefined;

    const setCurrentAction = (action) => {
        currentAction = action;
        setTimeout(() => {
            currentAction = undefined;
        }, 800)
    }

    const restartGame = () => {
        game = Game.start();
        game.onActionFire(setCurrentAction);
    }

    const useLetterHandler = (event) => {
        game.useLetter(event.detail.char);
    }

    game.onActionFire(setCurrentAction);
</script>

<ActionPopup show={currentAction !== undefined} action={currentAction}/>

<WinPopup
        on:restart={restartGame}
        show={$stateStore === STATE_WIN}
        rounds={$roundsStore}
/>

<LosePopup
        on:restart={restartGame}
        show={$stateStore === STATE_LOSE}
        roundsMax={roundsStore.getMax()}
        word={$wordMasterStore}
/>

<LoaderPopup
        show={$stateStore === STATE_LOADING}
/>

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
