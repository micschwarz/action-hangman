<script>
    import Popup from '../helper/Popup.svelte';

    export let action;
</script>

<Popup {...$$restProps}>
    <div class="popup-content">
        <h2>{action.getName()}!</h2>
        <div class="icon">
            <div class={`btn btn--no-click btn--${action.getColor()}`}>
                <i class={`uil uil-${action.getIcon()}`}></i>
            </div>
        </div>
        <div class="message">
            {@html action.getDescription()}
        </div>
    </div>
</Popup>

<style>
    .popup-content {
        display         : flex;
        flex-direction  : column;
        justify-content : center;
        align-items     : center;
    }

    h2 {
        margin : 0 0 1rem;
    }

    .icon {
        margin : 0 0 1.5rem;
    }

    .icon .btn {
        height    : 4rem;
        width     : 4rem;

        font-size : 1.5em;
    }
</style>
