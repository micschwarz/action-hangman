<script lang="ts">
    import { fade } from 'svelte/transition';

    export let show = false;
</script>

{#if show}
    <div class="popup" transition:fade|local={{y: 100, duration: 50}}>
        <div class="inner">
            <slot/>
        </div>
    </div>
{/if}

<style>
    .popup {
        position        : absolute;
        top             : 0;
        left            : 0;

        z-index         : var(--z-index-popup);

        display         : flex;
        align-items     : center;
        justify-content : center;

        width           : 100vw;
        height          : 100vh;
        height          : -webkit-fill-available;

        overflow        : hidden;
        padding         : 1rem;
        background      : rgba(10, 10, 15, .5);
    }

    .inner {
        min-width     : 20rem;
        max-width     : max(40rem, 100vw);
        min-height    : 10rem;
        max-height    : max(60rem, 100vh);

        padding       : 1rem;

        background    : var(--color-background-lighten);
        border        : 1px solid var(--color-background-border);
        border-radius : 5px;
        box-shadow    : 0 .4rem .8rem rgba(0, 0, 0, .2);
    }
</style>
