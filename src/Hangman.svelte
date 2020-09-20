<script>
    import LetterKeyboard             from './components/LetterKeyboard.svelte';
    import Debug                      from './components/helper/Debug.svelte';
    import { getContext, setContext } from 'svelte';
    import { Game }                   from './utils/Game';
    import Word                       from './components/Word.svelte';
    import Rounds                     from './components/Rounds.svelte';
    import { STATE_LOSE, STATE_WIN }  from './stores/state';
    import { STATE_LOADING }          from './stores/state';
    import WinPopup                   from './components/popups/WinPopup.svelte';
    import LosePopup                  from './components/popups/LosePopup.svelte';
    import Popup                      from './components/helper/Popup.svelte';
    import LoaderPopup                from './components/popups/LoaderPopup.svelte';
    import Actions                    from './components/Actions.svelte';

    export let debug = getContext('debug');


    let game = Game.start();
    setContext('game', game)
    const stateStore = game.getStateStore();

    const restartGame = () => {
        game = Game.start();
    }
</script>

{#if $stateStore === STATE_WIN}
    <WinPopup on:restart={restartGame}/>
{:else if $stateStore === STATE_LOSE}
    <LosePopup on:restart={restartGame}/>
{:else if $stateStore === STATE_LOADING}
    <LoaderPopup/>
{/if}


<section>
    <header>
        <div class="word">
            <Word/>
        </div>

        <div class="rounds">
            {#if $stateStore !== STATE_LOADING}
                <Rounds/>
            {/if}
        </div>
    </header>

    <main>
        {#if $stateStore !== STATE_LOADING}
            <LetterKeyboard/>
            <Actions/>
        {/if}
        {#if debug}
            <Debug/>
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
