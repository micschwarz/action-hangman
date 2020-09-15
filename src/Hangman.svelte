<script>
    import LetterKeyboard             from './components/LetterKeyboard.svelte';
    import Debug                      from './components/helper/Debug.svelte';
    import { getContext, setContext } from 'svelte';
    import { Game }                   from './utils/Game';
    import Word                       from './components/Word.svelte';
    import Rounds                     from './components/Rounds.svelte';
    import { STATE_LOSE, STATE_WIN }  from './stores/state';
    import WinPopup                   from './components/popups/WinPopup.svelte';
    import LosePopup                  from './components/popups/LosePopup.svelte';

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
{/if}

<section>
    <header>
        <div class="title">
            <h1>Hangman</h1>
        </div>

        <div class="rounds">
            <Rounds/>
        </div>

        <div class="nav">

        </div>
    </header>

    <main>
        <Word/>
        <LetterKeyboard/>
    </main>


    {#if debug}
        <Debug/>
    {/if}
</section>

<style>
    section {
        padding   : 1rem;
        max-width : 40rem;
        margin    : 0 auto;
    }

    header {
        display               : grid;
        grid-template-rows    : auto;
        grid-template-columns : 4rem auto 4rem;
        grid-template-areas   : "nav title rounds";
    }

    header .rounds {
        grid-area : rounds;
    }

    header .title {
        grid-area       : title;

        display         : flex;
        justify-content : center;
        align-items     : center;

        margin          : 0;
        text-align      : center;
    }

    header .nav {
        grid-area : nav;
    }
</style>
