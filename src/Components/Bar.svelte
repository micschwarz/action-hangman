<script>
    import { afterUpdate } from 'svelte';

    export let min   = 0;
    export let max   = 100;
    export let value = 50;

    // Clamp value
    let valueClamp;
    $: valueClamp = Math.min(Math.max(value, min), max);

    let valuePercent;
    $: valuePercent = (valueClamp - min) / (max - min) * 100;

    let bar;

    afterUpdate(() => {
        bar.style.setProperty('--value', `${ valuePercent }%`);
    });
</script>

<div class="bar" bind:this={bar}>

</div>


<style>
    .bar {
        --value       : 0%;
        position      : relative;

        content       : ' ';
        height        : .5rem;
        border-radius : .25rem;
        width         : 100%;
        background    : var(--color-background-lighten-2);
        overflow      : hidden;

        border        : 1px solid var(--color-background-border);
    }

    .bar:after {
        position   : absolute;
        top        : 0;
        left       : 0;

        content    : ' ';
        height     : .5rem;
        width      : var(--value);
        background : var(--color-primary-darken);
    }
</style>
