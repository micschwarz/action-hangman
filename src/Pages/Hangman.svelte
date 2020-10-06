<script lang="ts">
    import { fly }        from 'svelte/transition';
    import LetterKeyboard from '../Components/Hangman/LetterKeyboard.svelte';
    import Word           from '../Components/Hangman/Word.svelte';
    import Rounds         from '../Components/Hangman/Rounds.svelte';
    import Actions        from '../Components/Hangman/Actions.svelte';
    import ActionSnackbar from '../Components/Snackbars/ActionSnackbar.svelte';
    import { Game }       from '../Game/Game';
    import Icon           from '../Components/Icon.svelte';
    import GameMenu       from '../Components/Hangman/GameMenu.svelte';

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

    let showMenu     = false;
    const toggleMenu = () => {
        showMenu = !showMenu;
    };

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

    </main>

    <footer>
        <div class="actions">
            <Actions actions={$actionsStore}/>
        </div>
        <div class="game-menu">
            <button class="btn-2 btn-2--square btn-2--compact btn-2--flat btn-2--translucent" on:click={toggleMenu}>
                <span class="btn-2-icon">
                    <Icon name="bars"/>
                </span>
            </button>

            {#if showMenu}
                <div class="menu" transition:fly={{y: 20, duration: 100}}>
                    <GameMenu/>
                </div>
            {/if}
        </div>
    </footer>

</section>

<style>
    section {
        display               : grid;
        grid-template-rows    : auto auto auto;
        grid-template-columns : 21.5rem;
        grid-template-areas   : "header" "main" "footer";
        justify-content       : center;

        padding               : 1rem;
        max-width             : 40rem;
        margin                : 0 auto;
    }

    main {
        grid-area : main;
        padding   : 1rem;
    }

    header {
        box-sizing            : border-box;
        grid-area             : header;

        display               : grid;
        grid-template-rows    : auto;
        grid-template-columns : auto 2rem;
        grid-template-areas   : "word rounds";
        grid-gap              : 1rem;

        padding               : 1rem;
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

    footer {
        grid-area : footer;

        padding   : 1rem;

        position  : relative;
    }

    footer .actions {
        overflow-x         : auto;

        -ms-overflow-style : none;
        scrollbar-width    : none;

        margin-right       : 4.1rem;
    }

    footer .actions::-webkit-scrollbar {
        display : none;
    }

    footer .game-menu {
        position : absolute;
        right    : 0;
        top      : 0;
        padding  : 1rem;
    }

    footer .game-menu .menu {
        position  : absolute;
        right     : 1rem;
        top       : 0;

        transform : translateY(-100%);
    }
</style>
