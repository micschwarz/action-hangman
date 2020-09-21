<script lang="ts">
    import { getContext } from 'svelte';

    /**
     * @type {Game}
     */
    const game = getContext('game');
    const word = game.getWordStore();

</script>

<div class="word">
    {#each $word.toUpperCase().split('') as char}
        <div class="char">
            {char}
        </div>
    {/each}
</div>

<style>
    .word {
        display         : flex;
        align-items     : center;
        justify-content : center;
        padding         : 1rem;
    }

    .word .char {
        display         : flex;
        justify-content : center;
        align-items     : center;

        border          : 1px solid var(--color-text);
        background      : rgba(255, 255, 255, .05);
        width           : 2rem;
        height          : 2.75rem;
        border-radius   : 5px;

        font-size       : 1.2em;
        font-weight     : bold;

        margin-right    : 1rem;
    }

    .word .char:last-child {
        margin-right : 0;
    }
</style>
