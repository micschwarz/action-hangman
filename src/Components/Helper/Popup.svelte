<script lang="ts">
    import { fade }                 from 'svelte/transition';
    import { afterUpdate, onMount } from 'svelte';
    import Icon                     from '../Icon.svelte';

    export let show = false;
    export let color = 'var(--color-background)'
    export let backgroundIcon = null;

    let popup;

    afterUpdate(() => {
        if (popup) {
            popup.style.setProperty('--color-popup', color)
        }
    })

</script>

{#if show}
    <div class="popup" transition:fade|local={{y: 100, duration: 50}} bind:this={popup}>
        <div class="inner">
            {#if backgroundIcon}
                <div class="background-icon">
                    <Icon name={backgroundIcon}/>
                </div>
            {/if}
            <slot/>
        </div>
    </div>
{/if}

<style>
    .popup {
        position   : fixed;

        width      : 100vw;
        height     : 100vh;
        height     : --webkit-fill-available;

        background : rgba(0, 0, 0, .5);
        padding    : 1rem;

        z-index    : var(--z-index-popup);
    }

    .popup .inner {
        background    : var(--color-popup);

        min-width     : 5rem;
        max-width     : min(40rem, calc(100vw - 2rem));
        min-height    : 5rem;
        max-height    : 100vh;

        border-radius : .5rem;
        box-shadow    : 0 .1rem 1.5rem rgba(0, 0, 0, .5);

        position      : absolute;
        top           : 50%;
        left          : 50%;

        transform     : translate(-50%, -50%);

        overflow      : hidden;
    }

    .popup .inner .background-icon {
        position  : absolute;
        bottom    : -3rem;
        right     : -3rem;
        font-size : 10rem;
        color     : rgba(255, 255, 255, .1);
        z-index   : -1;
    }
</style>
