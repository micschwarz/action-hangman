<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { flip }                  from 'svelte/animate';
    import Alphabet                  from '../../utils/Alphabet/Alphabet';

    export let letters;

    const dispatch = createEventDispatcher();

    const letterClickHandler = (char) => {
        dispatch('useLetter', { char })
    }

    const keyboardPressHandler = (event) => {
        const char = event.key;
        if (Alphabet.validate(char)) {
            event.preventDefault();
            letterClickHandler(char)
        }
    }
</script>

<svelte:window on:keyup={keyboardPressHandler}/>
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
        grid-template-columns : repeat(5, 3rem);
        padding               : 1rem;
    }
</style>
