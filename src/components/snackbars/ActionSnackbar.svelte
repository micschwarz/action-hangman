<script>
    import Snackbar from '../helper/Snackbar.svelte';

    export let action;
</script>

<Snackbar {...$$restProps}>
    <div class="snackbar-content">
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
        display               : grid;
        grid-template-rows    : minmax(3rem, max-content);
        grid-template-columns : 3rem auto;
        grid-template-areas   : "icon text";
        grid-gap              : 1rem;
    }

    .snackbar-content .icon {
        grid-area       : icon;

        display         : flex;
        justify-content : center;
        align-items     : center;
    }

    .snackbar-content .icon .btn {
        width     : 3rem;
        height    : 3rem;

        font-size : 1.3em;
        transform : none;
    }

    .snackbar-content .text {
        grid-area      : text;

        display        : flex;
        flex-direction : column;
    }

    .snackbar-content .text h3 {
        margin : 0 0 .3rem;
    }
</style>
