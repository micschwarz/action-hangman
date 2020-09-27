<script lang="ts">
    import Popup                     from '../helper/Popup.svelte';
    import { createEventDispatcher } from 'svelte';

    export let rounds;
    export let word;

    const dispatch = createEventDispatcher();

    const restart = () => {
        dispatch('restart');
    };

    const share = () => {
        navigator.share({
            title: 'Ich habe gewonnen! 😃',
            text : `Leider habe ich das Wort ${ word } in ${ rounds } herausgefunden! Kannst du mich schlagen?`,
            url  : window.location.origin,
        });
    };
</script>
<Popup {...$$restProps}>
    <div class="popup-content">
        <h2>Gewonnen</h2>
        <div class="message">
            Du hast das Spiel in {rounds} Runden beendet.
        </div>
        <div class="btns">
            <button class="btn" on:click={restart}>Neues Spiel</button>
            {#if navigator.share}
                <button class="btn btn--green" on:click={share}>Teilen</button>
            {/if}
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

    .btns {
        display : flex;
    }

    .btns .btn {
        margin : .5rem;
        width  : 7rem;
    }

    h2,
    .message {
        margin : 0 0 1rem;
    }
</style>
