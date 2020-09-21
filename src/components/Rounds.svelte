<script lang="ts">
    import { getContext } from 'svelte';

    /**
     * @type {Game}
     */
    const game = getContext('game');

    const roundsStore = game.getRoundsStore();
</script>

<div class="rounds">
    <div class="current">{$roundsStore}</div>
    <div class="separator"></div>
    <div class="max">{roundsStore.getMax()}</div>
</div>

<style>
    .rounds {
        display        : flex;
        flex-direction : column;
        align-items    : stretch;

        padding        : 1rem;
        width          : 4rem;

        font-size      : 1.4em;
        text-align     : center;
    }

    .rounds .current {
        margin-bottom : .5rem;
        font-weight   : bold;
    }

    .rounds .separator {
        border : 1px solid var(--color-text);
    }

    .rounds .max {
        margin-top : .5rem;
    }
</style>
