<script lang="ts">
    export let word;
</script>

<div class="word">
    {#each word.toUpperCase().split('') as char}
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
    }

    .word .char {
        display         : flex;
        justify-content : center;
        align-items     : center;

        border          : 1px solid var(--color-text-translucent-2);
        background      : rgba(255, 255, 255, .05);
        width           : 2rem;
        height          : 2.75rem;
        border-radius   : .5rem;
        box-shadow      : 0 .05rem .75rem rgba(0, 0, 0, .3);

        font-size       : 1.2em;
        font-weight     : bold;

        margin-right    : 1rem;
    }

    .word .char:last-child {
        margin-right : 0;
    }
</style>
