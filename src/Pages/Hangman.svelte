<script lang="ts">
    import LetterKeyboard from '../Components/Hangman/LetterKeyboard.svelte';
    import Word           from '../Components/Hangman/Word.svelte';
    import Rounds         from '../Components/Hangman/Rounds.svelte';
    import Actions        from '../Components/Hangman/Actions.svelte';
    import ActionSnackbar from '../Components/Snackbars/ActionSnackbar.svelte';
    import { Game }       from '../Game/Game';

    export let game: Game;

    let currentAction = undefined;

    const setCurrentAction = (action) => {
        currentAction = action;
        setTimeout(() => {
            currentAction = undefined;
        }, 2000);
    };

    const useLetterHandler = (event) => {
        game.use(event.detail.char);
    };

    game.registerActionCallback(setCurrentAction);

    const wordStore    = game.getWordStore();
    const roundsStore  = game.getGameState().getRoundsStore();
    const lettersStore = game.getAlphabetStore();
    const actionsStore = game.getActionsStore();
</script>

<ActionSnackbar show={currentAction !== undefined} action={currentAction}/>

<section>
    <header>
        <div class="word">
            <Word word={$wordStore}/>
        </div>

        <div class="rounds">
            <Rounds max={roundsStore.getMax()} current={$roundsStore}/>
        </div>
    </header>

    <main>
        <LetterKeyboard letters={$lettersStore} on:useLetter={useLetterHandler}/>
        <Actions actions={$actionsStore}/>
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
