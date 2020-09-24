<script>
    import { fade, fly, slide } from 'svelte/transition';

    export let show = false;
</script>

{#if show}
    <div class="snackbar" transition:slide={{duration: 200}}>
        <div class="inner">
            <slot>

            </slot>
        </div>
    </div>
{/if}
<style>
    .snackbar {
        position         : absolute;
        bottom           : 0;
        left             : 0;

        z-index          : var(--z-index-snackbar);

        padding          : 0 1rem 1rem;

        background-image : linear-gradient(to top, rgba(10, 10, 15, .5) 0%, transparent 100%);
    }

    .inner {
        display       : flex;
        align-items   : center;

        width         : calc(100vw - 2rem);

        overflow      : hidden;
        padding       : 1rem;

        background    : var(--color-background-lighten);
        border        : 1px solid var(--color-background-border);
        border-radius : 5px;
    }
</style>
