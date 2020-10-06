<script lang="ts">
    export let max;
    export let current;
</script>

<div class="rounds">
    <div class="current">{current}</div>
    <div class="separator"></div>
    <div class="max">{max}</div>
</div>

<style>
    .rounds {
        display        : flex;
        flex-direction : column;
        align-items    : stretch;

        width          : 2rem;

        font-size      : 1.4em;
        text-align     : center;
    }

    .rounds .current {
        font-weight : bold;
    }

    .rounds .separator {
        position : relative;
        border   : 1px solid var(--color-text-translucent);
        margin   : .5rem 0 .65rem;
    }

    .rounds .separator:after {
        position   : absolute;
        content    : 'von';
        background : var(--color-background);
        color      : var(--color-text-translucent);
        padding    : 0 .2rem;
        font-size  : .45em;
        transform  : translate(-50%, -50%);
        top        : 50%;
        left       : 50%;
    }


</style>
