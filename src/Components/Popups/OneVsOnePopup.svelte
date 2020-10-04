<script>
    import Popup           from '../Helper/Popup.svelte';
    import Icon            from '../Icon.svelte';
    import Loader          from '../Loader/Loader.svelte';
    import { currentUser } from '../../services/user/User';

    export let wordManager;
    let user = currentUser;

    let buttonsLocked = false;
    let gameCreation;

    let showGameJoin      = false;
    let isGameJoinLoading = false;
    let gameCode          = '';

    let isGameCodeValid;
    $: isGameCodeValid = gameCode.length === 6;

    let gameError;

    let hasGameCodeError;
    $: hasGameCodeError = (!isGameCodeValid && gameCode.length > 0) || gameError !== undefined;

    const createGame = () => {
        buttonsLocked = true;

        gameCreation = wordManager.createGame();
    };

    const showJoinGameForm = () => {
        buttonsLocked = true;
        showGameJoin  = true;
    };

    const joinGame = () => {
        isGameJoinLoading = true;
        wordManager.joinGame(gameCode)
            .catch(error => gameError = error)
            .finally(() => isGameJoinLoading = false);
    };
</script>

<Popup show={true}>
    <div class="popup-content">
        <h2>One VS One</h2>

        <div class="actions">
            <button type="submit" class="btn-2 btn-2--green" disabled={buttonsLocked}
                    on:click|once={createGame}>
                <span class="btn-2-icon"><Icon name="plus"/></span>
                Erstellen
            </button>
            <button type="submit" class="btn-2" disabled={buttonsLocked}
                    on:click|once={showJoinGameForm}>
                <span class="btn-2-icon"><Icon name="user-check"/></span>
                Betreten
            </button>
        </div>

        <div class="game-init">
            {#if gameCreation}
                <div class="game-init-created">
                    {#await gameCreation}
                        <Loader/>
                    {:then code}
                        <div class="code">{code}</div>
                        <div class="message">Gib diesen Code deinem Gegner!</div>
                    {:catch error}
                        <div class="error">Ein Fehler ist aufgetreten!</div>
                    {/await}
                </div>
            {:else if showGameJoin}
                <div class="game-init-join">
                    <div class="message">Gib den Code deines Gegners ein!</div>
                    <form class="game-init-join-form">
                        <label class="form-2 form-2--required" class:form-2--has-error={hasGameCodeError}
                               for="gameCode">
                            <span class="form-2-label">Code</span>
                            <input class="form-2-input" type="text" name="gameCode" id="gameCode"
                                   required maxlength="6" minlength="6" pattern="^[A-Za-z0-9]*$" bind:value={gameCode}>
                            <span class="form-2-error">
                            {#if !isGameCodeValid}
                                Der Code hat 6 Stellen
                            {:else if gameError === 'GAME_NOT_EXISTS'}
                                Das Spiel existiert nicht
                            {:else if gameError === 'GAME_ALREADY_FULL'}
                                Das Spiel läuft bereits
                            {:else}
                                Fehler
                            {/if}
                        </span>
                        </label>
                        <div class="game-init-join-actions">
                            <button class="btn-2 btn-2--green" on:click|preventDefault={joinGame}
                                    disabled="{!isGameCodeValid || isGameJoinLoading}">
                                {#if isGameJoinLoading}
                                    <Loader small white/>
                                {:else}
                                    <span class="btn-2-icon"><Icon name="play"/></span>
                                    Los!
                                {/if}
                            </button>
                        </div>
                    </form>
                </div>
            {/if}
        </div>


    </div>
</Popup>


<style>
    .popup-content {
        padding : 1.5rem;
    }

    .popup-content h2 {
        margin    : 0;
        font-size : 1.5em;
        color     : rgba(255, 255, 255, .95);
    }

    .popup-content .actions {
        margin-top : 1rem;
        display    : flex;
    }

    .popup-content .actions .btn-2 {
        margin-right : 1rem;
    }

    .popup-content .actions .btn-2:last-child {
        margin-right : 0;
    }

    .popup-content .game-init .game-init-created {
        display        : flex;
        flex-direction : column;
        align-items    : center;

        margin-top     : 2rem;
    }

    .popup-content .game-init .game-init-created .code {
        font-size      : 1.8em;
        margin         : .7rem 0;
        font-weight    : bold;
        letter-spacing : .4rem;
    }

    .popup-content .game-init .game-init-created .message {
        font-size : 1.05em;
        color     : var(--color-text-darken);
    }

    .popup-content .game-init .game-init-created .error {
        font-size : 1.05em;
        color     : var(--red);
    }

    .popup-content .game-init .game-init-join {
        margin-top : 2rem;
    }

    .popup-content .game-init .game-init-join .message {
        font-size       : 1.05em;
        color           : var(--color-text-darken);

        display         : flex;
        justify-content : center;
    }

    .popup-content .game-init .game-init-join .game-init-join-form {
        margin-top : 1rem;
    }

    .popup-content .game-init .game-init-join .game-init-join-form .game-init-join-actions {
        margin-top : 1rem;
    }

    .popup-content .game-init .game-init-join .game-init-join-form .game-init-join-actions .btn-2 {
        width : 7rem;
    }
</style>
