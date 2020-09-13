<script>
    import LetterKeyboard             from './components/LetterKeyboard.svelte';
    import Debug                      from './components/helper/Debug.svelte';
    import { getContext, setContext } from 'svelte';
    import { Game }                   from './utils/Game';
    import Word                       from './components/Word.svelte';
    import { LocalWord }              from './services/word/LocalWord';

    export let debug = getContext('debug');

    setContext('game', new Game(new LocalWord()));
</script>

<main>
    <Word/>
    <LetterKeyboard/>

    {#if debug}
        <Debug/>
    {/if}
</main>

<style>
    main {
        padding : 1rem;
    }
</style>
