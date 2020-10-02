<script>
    import Snackbar from '../Helper/Snackbar.svelte';

    export let action;
</script>

<Snackbar {...$$restProps}>
    <div class={`snackbar-content snackbar-content--${action.getColor()}`}>
        <div class="icon">
            <div class={`btn btn--no-click btn--${action.getColor()}`}>
                <i class={`uil uil-${action.getIcon()}`}></i>
            </div>
        </div>
        <div class="text">
            <h3>{action.getName()}!</h3>
            <div class="message">
                {@html action.getDescription()}
            </div>
        </div>
    </div>
</Snackbar>

<style>


    .snackbar-content {
        width    : 100%;
        height   : 100%;

        padding  : 1.2rem;

        position : relative;
        z-index  : 1;
    }

    .snackbar-content--red {
        background : var(--red-darken);
    }

    .snackbar-content--green {
        background : var(--green-darken);
    }

    .snackbar-content--blue {
        background : var(--blue-darken);
    }

    .snackbar-content--yellow {
        background : var(--yellow-darken);
    }

    .snackbar-content .icon {
        font-size : 5rem;
        color     : var(--color-text-translucent-2);

        position  : absolute;
        right     : -1rem;
        bottom    : -1rem;
        z-index   : -1;
    }

    .snackbar-content .text {
        display        : flex;
        flex-direction : column;
        color          : var(--color-text-darken);
    }

    .snackbar-content .text h3 {
        margin : 0 0 .3rem;
        color  : var(--color-text);
    }
</style>
