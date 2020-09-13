<script>
    import { getContext } from 'svelte';

    /**
     * @type {Game}
     */
    const game = getContext('game');

    const lettersStore = game.getLettersStore()
</script>

<div class="btns">
    {#each $lettersStore as letter}
        <button class="btn btn--square"
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
