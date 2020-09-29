<script lang="ts">
    import Popup                     from '../Helper/Popup.svelte';
    import { createEventDispatcher } from 'svelte';
    import Icon                      from '../Icon.svelte';
    import { navigate }              from 'svelte-routing';

    export let word;
    export let roundsMax;

    const dispatch = createEventDispatcher();

    const restart = () => {
        dispatch('restart');
    }

    const share = () => {
        navigator.share({
            title: 'Ich habe verloren 😔',
            text : `Leider habe ich das Wort ${ word } nicht in ${ roundsMax } Runden herausgefunden. Kannst du es besser?`,
            url  : window.location.origin,
        });
    };

    const toMenu = () => {
        navigate('/');
    }
</script>
<Popup {...$$restProps}>
    <section class="popup-content">
        <h2>Verloren</h2>

        <div class="message">
            Nächstes mal vielleicht!
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

            <div class="stat">
                <div class="stat-icon">
                    <span class="stat-icon-icon">
                    <Icon name="spin"/>
                    </span>
                    <span class="stat-icon-description">Runden</span>
                </div>
                <span class="stat-value">{roundsMax}</span>
            </div>
        </div>

        <div class="actions">
            <button class="btn-2 btn-2--flat btn-2--translucent btn-2--square" on:click={() => navigate('/')}>
                <span class="btn-2-icon"><Icon name="home-alt"/></span>
            </button>
            <button class="btn-2 btn-2--flat btn-2--translucent" on:click={restart}>
                <span class="btn-2-icon"><Icon name="play"/></span>
                Nochmal
            </button>
            <button class="btn-2 btn-2--flat btn-2--translucent btn-2--square" on:click={share}>
                <span class="btn-2-icon"><Icon name="share-alt"/></span>
            </button>
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
        font-size : 0.75em;
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
