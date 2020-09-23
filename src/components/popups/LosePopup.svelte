<script lang="ts">
    import Popup                                             from '../helper/Popup.svelte';
    import { createEventDispatcher, getContext } from 'svelte';

    export let word;
    export let roundsMax;

    const dispatch = createEventDispatcher();

    const restart = () => {
        dispatch('restart');
    }
</script>
<Popup {...$$restProps}>
    <div class="popup-content">
        <h2>Verloren</h2>
        <div class="message">
            Du hast das Wort {word} nicht {roundsMax} Runden erraten.
        </div>
        <button class="btn" on:click={restart}>Neues Spiel</button>
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
