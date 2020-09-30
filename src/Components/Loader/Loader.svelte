<script lang="ts">
    export let small = false;
    export let white = false;
</script>

<span class="loader" class:loader--sm={small} class:loader--white={white}></span>

<style>
    .loader {
        --loader-size      : 2.5rem;
        --loader-thickness : .4rem;
        --loader-color     : var(--color-primary);

        position           : relative;
        width              : var(--loader-size);
        height             : var(--loader-size);

    }

    .loader:before {
        content       : ' ';
        width         : calc(var(--loader-size) - var(--loader-thickness) * 2);
        height        : calc(var(--loader-size) - var(--loader-thickness) * 2);
        position      : absolute;
        top           : 0;
        left          : 0;
        border        : var(--loader-thickness) solid transparent;
        border-top    : var(--loader-thickness) solid var(--loader-color);
        border-radius : 50%;
        animation     : loader-spin .7s ease-in-out infinite;
    }

    .loader.loader--sm {
        --loader-size      : 1.5rem;
        --loader-thickness : .3rem;
    }

    .loader.loader--white {
        --loader-color : var(--color-text);
    }

    @keyframes loader-spin {
        0% {
            transform : rotate(0deg);
        }

        100% {
            transform : rotate(359deg);
        }
    }
</style>
