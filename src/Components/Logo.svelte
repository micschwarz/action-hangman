<script lang="ts">
    import { onMount } from 'svelte';

    export let size = 6;

    let logoElement;

    onMount(() => {
        logoElement.style.setProperty('--size', `${ size }em`);
        logoElement.style.setProperty('--size-shadow', `${ size / 20 }rem`);
    })

</script>

<div class="logo" bind:this={logoElement}>
    H
</div>

<style>
    .logo {
        font-size   : var(--size);
        font-family : 'Source Code Pro', sans-serif;
        font-weight : bold;
        color       : var(--color-text);
        text-shadow : 0 var(--size-shadow) var(--color-text-darken);
    }
</style>
