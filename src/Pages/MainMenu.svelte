<script>
    import Logo               from '../Components/Logo.svelte';
    import Icon               from '../Components/Icon.svelte';
    import { GameType }       from '../utils/Game';
    import { navigate, Link } from "svelte-routing";

    export let user;
    let displayName = user.getDisplayName();
</script>

<main class="menu">
    <div class="logo">
        <Logo size={4}/>
        <span class="logo-text">angman</span>
    </div>
    {#if displayName}
        <div class="greeting">
            Hallo {displayName}! Lust auf eine Runde?
        </div>
    {/if}
    <nav class="navigation">
        <button class="btn" on:click={() => navigate('/game', {state: GameType.LOCAL.toString()})}>
            <span class="btn-media"><Icon name="play"/></span>
            Einzelspieler
        </button>
        <button class="btn" on:click={() => navigate('/game', {state: GameType.LOCAL_MULTIPLAYER.toString()})}>
            <span class="btn-media"><Icon name="play"/></span>
            Lokaler Multiplayer
        </button>
        <button class="btn btn--green" on:click={() => navigate('/profile')}>
            <span class="btn-media"><Icon name="user"/></span>
            Profil
        </button>
    </nav>
</main>

<style>
    .menu {
        padding   : 1rem;
        max-width : 40rem;
        margin    : 0 auto;
    }

    .logo {
        display         : flex;
        align-items     : center;
        justify-content : center;
    }

    .logo .logo-text {
        font-size   : 1.8em;
        margin-left : .3rem;
    }

    .navigation {
        display        : flex;
        flex-direction : column;
        align-items    : center;
        margin-top     : 1.5rem;
    }

    .navigation .btn {
        width         : 10rem;
        margin-bottom : 1rem;
    }

    .greeting {
        display         : flex;
        justify-content : center;
        margin-top      : 1rem;

        color           : var(--color-text-darken);
    }
</style>
