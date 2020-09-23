<script lang="ts">
    import Popup                                             from '../helper/Popup.svelte';
    import { createEventDispatcher } from 'svelte';

    export let rounds;

    const dispatch = createEventDispatcher();

    const restart = () => {
        dispatch('restart');
    }
</script>
<Popup {...$$restProps}>
    <div class="popup-content">
        <h2>Gewonnen</h2>
        <div class="message">
            Du hast das Spiel in {rounds} Runden beendet.
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
