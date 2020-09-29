<script lang="ts">
    import Popup from '../Helper/Popup.svelte';
</script>

<Popup {...$$restProps}>
    <div class="popup-content">
        <div class="loader"></div>
    </div>
</Popup>

<style>
    .popup-content {
        padding         : 1.5rem;

        display         : flex;
        justify-content : center;
        align-items     : center;
    }
</style>
