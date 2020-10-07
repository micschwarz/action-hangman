<script lang="ts" context="module">
    export const addXP = (amount) => {
        console.log(_add);
        if (_add) {
            _add(amount);
        }
    };

    let _add = undefined;
</script>

<script lang="ts">
    import Icon    from './Icon.svelte';
    import { fly } from 'svelte/transition';

    let show        = false;
    let amountAdded = 0;

    _add = (amount) => {
        amountAdded = amount;
        show        = true;

        setTimeout(() => {
            show = false;
        }, 2500);
    };
</script>

{#if show}
    <div class="xp-add" transition:fly={{duration: 300, x: 30}}>
        +{amountAdded} XP
        <div class="xp-add-icon">
            <Icon name="trophy"/>
        </div>
    </div>
{/if}

<style>
    .xp-add {
        padding       : 1.5rem;
        background    : var(--color-primary);
        border-radius : .5rem;
        box-shadow    : 0 .1rem 1.5rem rgba(0, 0, 0, .5);
        overflow      : hidden;
        font-weight   : bold;
        z-index       : var(--z-index-xp);

        position      : fixed;
        top           : 1.5rem;
        right         : 1.5rem;
    }

    .xp-add-icon {
        position  : absolute;
        right     : -1.5rem;
        bottom    : -1rem;

        color     : var(--color-text-translucent-2);
        font-size : 4rem;
    }
</style>
