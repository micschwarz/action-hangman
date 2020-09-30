<script lang="ts">
    import Popup  from '../Helper/Popup.svelte';
    import Loader from '../Loader/Loader.svelte';
</script>

<Popup {...$$restProps}>
    <div class="popup-content">
        <Loader/>
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
