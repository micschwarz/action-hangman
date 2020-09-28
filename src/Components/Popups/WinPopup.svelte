<script lang="ts">
    import Popup                     from '../Helper/Popup.svelte';
    import { createEventDispatcher } from 'svelte';
    import Icon                      from '../Icon.svelte';
    import { navigate }              from "svelte-routing";

    export let rounds;
    export let word;

    const dispatch = createEventDispatcher();

    const restart = () => {
        dispatch('restart');
    };

    const share = () => {
        navigator.share({
            title: 'Ich habe gewonnen! 😃',
            text : `Ich habe das Wort ${ word } in ${ rounds } herausgefunden! Kannst du mich schlagen?`,
            url  : window.location.origin,
        });
    };

    const toMenu = () => {
        navigate('/');
    }
</script>
<Popup {...$$restProps}>
    <div class="popup-content">
        <h2>Gewonnen</h2>
        <div class="message">
            Du hast das Spiel in {rounds} Runden beendet.
        </div>
        <div class="btns">
            <button class="btn" on:click={restart}>
                <span class="btn-media"><Icon name="play"/></span>
                Neues Spiel
            </button>
            <button class="btn" on:click={toMenu}>
                <span class="btn-media"><Icon name="home-alt"/></span>
                Menü
            </button>
            {#if navigator.share}
                <button class="btn btn--green btn--square" on:click={share}>
                    <Icon name="share-alt"/>
                </button>
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
    }

    h2,
    .message {
        margin : 0 0 1rem;
    }
</style>
