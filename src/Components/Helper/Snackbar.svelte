<script>
    import { fly } from 'svelte/transition';

    export let show = false;
</script>

{#if show}
    <div class="snackbar">
        <div class="inner" transition:fly={{y: 50, duration: 200}}>
            <slot>

            </slot>
        </div>
    </div>
{/if}
<style>
    .snackbar {
        position        : absolute;
        left            : 0;
        bottom          : 0;
        width           : 100vw;

        z-index         : var(--z-index-snackbar);

        display         : flex;
        justify-content : center;

        overflow        : hidden;
    }

    .inner {
        display       : flex;
        align-items   : center;

        max-width     : 40rem;
        width         : calc(100vw - 2rem);

        overflow      : hidden;

        background    : var(--color-background);
        box-shadow    : 0 .1rem 1.5rem rgba(0, 0, 0, .5);
        border-radius : .5rem;

        margin        : 1rem;
    }
</style>
