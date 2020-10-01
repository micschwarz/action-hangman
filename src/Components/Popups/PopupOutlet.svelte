<script lang="ts" context="module">
    import { writable } from 'svelte/store';

    const { subscribe, update, set } = writable([]);
    const popupStore                 = {
        subscribe,
        add      : (popup, props = {}) => {
            const popupsAdd = [{ popup, props }];
            update(popups => popups.concat(popupsAdd));
        },
        remove   : (popup) => {
            update(popups => popups.filter(p => p.popup !== popup));
        },
        removeAll: () => set([]),
    };

    export const open     = popupStore.add;
    export const close    = popupStore.remove;
    export const closeAll = popupStore.removeAll;
</script>

<section id="popup-outlet">
    {#each $popupStore as popup (popup)}
        <svelte:component this={popup.popup} {...popup.props} closeSelf={() => close(popup.popup)}/>
    {/each}
</section>

<style>
    #popup-outlet {
        position : absolute;
        top      : 0;
        left     : 0;
    }
</style>
