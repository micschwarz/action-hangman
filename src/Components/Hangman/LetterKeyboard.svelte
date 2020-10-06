<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { flip }                  from 'svelte/animate';
    import Alphabet                  from '../../Game/Alphabet/Alphabet';

    export let letters;

    const dispatch = createEventDispatcher();

    const letterClickHandler = (char) => {
        dispatch('useLetter', { char });
    };
</script>

<div class="btns">
    {#each letters as letter (letter.getValue())}
        <button class="btn-2 btn-2--compact btn-2--square"
                animate:flip={{duration: 300}}
                on:click={() => letterClickHandler(letter.getValue())}
                disabled={letter.isUsed()}>
            {letter.getLabel()}
        </button>
    {/each}
</div>

<style>
    .btns {
        display               : grid;
        grid-gap              : 1rem;
        grid-template-columns : repeat(5, 3.1rem);
    }
</style>
