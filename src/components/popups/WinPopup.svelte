<script>
    import Popup                                             from '../helper/Popup.svelte';
    import { createEventDispatcher, getContext } from 'svelte';

    const game = getContext('game');
    const roundsStore = game.getRoundsStore();

    const dispatch = createEventDispatcher();

    const restart = () => {
        dispatch('restart');
    }
</script>
<Popup>
    <div class="popup-content">
        <h2>Gewonnen</h2>
        <div class="message">
            Du hast das Spiel in {$roundsStore} Runden beendet.
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
