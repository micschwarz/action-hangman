<script>
    import { getContext } from 'svelte';
    import { flip }       from 'svelte/animate';
    import Alphabet       from '../utils/Alphabet/Alphabet';

    /**
     * @type {Game}
     */
    const game = getContext('game');

    const lettersStore = game.getLettersStore()

    const keyboardPress = (event) => {
        const char = event.key;
        if (Alphabet.validate(char)) {
            event.preventDefault();
            game.useLetter(char);
        }
    }
</script>

<svelte:window on:keyup={keyboardPress}/>
<div class="btns">
    {#each $lettersStore as letter (letter.getValue())}
        <button class="btn btn--square"
                animate:flip={{duration: 300}}
                on:click={() => game.useLetter(letter.getValue())}
                disabled={letter.isUsed()}>
            {letter.getLabel()}
        </button>
    {/each}
</div>

<style>
    .btns {
        display               : grid;
        grid-gap              : 1rem;
        grid-template-columns : repeat(5, 3rem);
        justify-content       : center;
        padding               : 1rem;
    }
</style>
