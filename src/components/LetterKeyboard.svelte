<script>
    import { getContext } from 'svelte';
    import { flip } from 'svelte/animate';

    /**
     * @type {Game}
     */
    const game = getContext('game');

    const lettersStore = game.getLettersStore()
</script>

<div class="btns">
    {#each $lettersStore as letter (letter.getValue())}
        <button class="btn btn--square"
                animate:flip={{duration: 300}}
                on:click={() => lettersStore.use(letter.getValue())}
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
