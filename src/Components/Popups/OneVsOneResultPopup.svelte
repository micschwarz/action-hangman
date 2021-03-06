<script lang="ts">
    import Popup           from '../Helper/Popup.svelte';
    import Icon            from '../Icon.svelte';
    import { navigate }    from 'svelte-routing';
    import Loader          from '../Loader/Loader.svelte';
    import { currentUser } from '../../services/user/User';
    import { State }       from '../../Game/GameState';

    export let closeSelf;

    export let rounds;
    export let roundsMax;
    export let word;
    export let status;
    export let game;
    export let addXP;

    let color          = 'var(--color-background)';
    let backgroundIcon = 'clock-ten';

    let gameRunning = true;
    let lost        = true;

    let roundsOther = undefined;

    const unsub = game.onSnapshot(documentRef => {
        const gameData  = documentRef.data();
        const isPlayer1 = gameData.player1 === currentUser.getUid();

        if (!gameData.roundsPlayer1 || !gameData.roundsPlayer1) {
            return;
        }

        unsub(); // Unsub to prevent memory leak
        gameRunning = false;

        if (isPlayer1) {
            lost        = gameData.roundsPlayer2 <= gameData.roundsPlayer1;
            roundsOther = gameData.roundsPlayer2;
        } else {
            lost        = gameData.roundsPlayer2 >= gameData.roundsPlayer1;
            roundsOther = gameData.roundsPlayer1;
        }

        if (status === State.LOST) {
            lost = true;
        }

        addXP(status);

        color          = lost ? 'var(--red-darken)' : 'var(--green-darken)';
        backgroundIcon = lost ? 'times-circle' : 'check-circle';
    });

    const share = () => {
        navigator.share({
            title: lost ? 'Ich habe im 1v1 verloren 😔' : 'Ich habe im 1v1 gewonnen! 😃',
            text : lost
                ? `Ich habe das Wort ${ word } nicht ${ rounds } Runden herausgefunden! Kannst du mich schlagen?`
                : `Ich habe das Wort ${ word } nicht in ${ roundsMax } Runden herausgefunden! Kannst du es besser?`,
            url  : window.location.origin,
        });
    };

    const toMenu = () => {
        closeSelf();
        navigate('/');
    };
</script>
<Popup {color} {backgroundIcon} show="{true}">
    <section class="popup-content">
        {#if gameRunning}
            <h2>Auf Gegner warten</h2>
        {:else if lost}
            <h2>Verloren</h2>
        {:else}
            <h2>Gewonnen</h2>
        {/if}
        <div class="message">
            {#if gameRunning}
                Du warst erster!
            {:else if lost}
                Nächstes mal vielleicht!
            {:else}
                Schaffst dus nochmal?
            {/if}
        </div>

        <div class="stats">
            <div class="stat">
                <div class="stat-icon">
                    <span class="stat-icon-icon">
                    <Icon name="book-open"/>
                    </span>
                    <span class="stat-icon-description">Wort</span>
                </div>
                <span class="stat-value">{word}</span>
            </div>
        </div>

        <div class="stats">
            <div class="stat">
                <div class="stat-icon">
                    <span class="stat-icon-icon">
                    <Icon name="spin"/>
                    </span>
                    <span class="stat-icon-description">Runden (Du)</span>
                </div>
                <span class="stat-value">{rounds}</span>
            </div>

            <div class="stat">
                {#if roundsOther}
                    <div class="stat-icon">
                        <span class="stat-icon-icon">
                        <Icon name="spin"/>
                        </span>
                        <span class="stat-icon-description">Runden (Gegner)</span>
                    </div>
                    <span class="stat-value">{roundsOther}</span>
                {:else}
                    <Loader small white/>
                {/if}
            </div>
        </div>

        <div class="actions">
            <button class="btn-2 btn-2--flat btn-2--translucent" on:click={toMenu}>
                <span class="btn-2-icon"><Icon name="home-alt"/></span>
                Menü
            </button>
            {#if !gameRunning}
                <button class="btn-2 btn-2--flat btn-2--translucent" on:click={share}>
                    <span class="btn-2-icon"><Icon name="share-alt"/></span>
                    Teilen
                </button>
            {/if}
        </div>
    </section>
</Popup>

<style>
    .popup-content {
        padding   : 1.5rem;
        min-width : 100%;
    }

    .popup-content h2 {
        margin    : 0;
        font-size : 1.5em;
        color     : rgba(255, 255, 255, .95);
    }

    .popup-content .message {
        margin-top : .5rem;
        font-size  : 1.1em;
        color      : var(--color-text-translucent-light);
    }

    .popup-content .stats {
        margin-top      : 1.2rem;
        font-size       : 1.1em;
        color           : var(--color-text-translucent-light);
        display         : flex;
        justify-content : center;
    }

    .popup-content .stats .stat {
        display         : flex;
        justify-content : center;
        align-items     : center;

        padding         : .5rem 2rem;
        border-right    : 1px solid rgba(255, 255, 255, .1);
    }

    .popup-content .stats .stat .stat-value {
        font-size   : 1.2em;
        font-weight : bold;
    }

    .popup-content .stats .stat:last-child {
        padding-right : 0;
        border-right  : none;
    }

    .popup-content .stats .stat:first-child {
        padding-left : 0;
    }

    .popup-content .stats .stat .stat-icon {
        display        : flex;
        flex-direction : column;
        align-items    : center;

        margin-right   : 1rem;

        color          : var(--color-text-translucent-light-2);
    }

    .popup-content .stats .stat .stat-icon .stat-icon-icon {
        font-size : 1.7em;
    }

    .popup-content .stats .stat .stat-icon .stat-icon-description {
        font-size  : 0.75em;
        text-align : center;
    }

    .popup-content .actions {
        margin-top      : 1.2rem;

        display         : flex;
        justify-content : center;
    }

    .popup-content .actions .btn-2 {
        margin-right : .5rem;
    }

    .popup-content .actions .btn-2:last-child {
        margin-right : 0;
    }
</style>
