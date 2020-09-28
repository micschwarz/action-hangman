<script lang="ts">
    import Popup from '../Helper/Popup.svelte';
</script>

<Popup {...$$restProps}>
    <div class="popup-content">
        <h2>Lädt...</h2>
        <div class="loader"></div>
    </div>
</Popup>

<style>
    .popup-content {
        display         : flex;
        flex-direction  : column;
        justify-content : center;
        align-items     : center;
    }

    h2,
    .message {
        margin : 0 0 1rem;
    }
</style>
