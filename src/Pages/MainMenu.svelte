<script>
    import Logo            from '../Components/Logo.svelte';
    import Icon            from '../Components/Icon.svelte';
    import { GameTypes }   from '../Game/GameType/GameType';
    import { navigate }    from 'svelte-routing';
    import { currentUser } from '../services/user/User';

    let displayName = currentUser.getDisplayName();

    const logout = () => {
        currentUser.logout();
    };

    const start = (id) => {
        navigate(
            '/game',
            {
                state: { id },
            },
        );
    };
</script>

<main class="menu">
    <div class="logo">
        <Logo size={4}/>
        <span class="logo-text">angman</span>
    </div>
    {#if displayName}
        <div class="greeting">
            Hallo {displayName}, Lust auf eine Runde?
        </div>
    {/if}
    <nav class="navigation">
        <div class="game-modes-scroll">
            <div class="game-modes">
                {#each Object.keys(GameTypes) as id (id)}
                    <div class={`card card--${GameTypes[id].color}`}
                         on:click={() => start(id)}>
                        <div class="icon">
                            <Icon name={GameTypes[id].icon}/>
                        </div>
                        <h3 class="title">{GameTypes[id].name}</h3>
                        <div class="description">
                            {GameTypes[id].description}
                        </div>
                    </div>
                {/each}
            </div>
        </div>
        <div class="actions">
            <button class="btn-2" on:click={() => navigate('/profile')}>
                <span class="btn-2-icon"><Icon name="users-alt"/></span>
                Profil
            </button>
            <button class="btn-2 btn-2--red" on:click={logout}>
                <span class="btn-2-icon"><Icon name="sign-out-alt"/></span>
                Logout
            </button>
        </div>
    </nav>
</main>

<style>
    .menu {
        padding   : 1.5rem;
        max-width : 40rem;
        width     : 100%;
        margin    : 0 auto;
        height    : 100vh;
    }

    .logo {
        display     : flex;
        align-items : center;
    }

    .logo .logo-text {
        font-weight : bold;
        margin-left : .3rem;
        font-size   : 1.8em;
    }

    .greeting {
        margin : .5rem 0;
        color  : var(--color-text-darken);
    }

    .navigation {
        margin-top : -2rem;
    }

    .game-modes-scroll {
        overflow-y         : auto;
        overflow-x         : auto;
        margin             : -1.5rem -1.5rem;
        padding            : 3rem 0;

        -ms-overflow-style : none;
        scrollbar-width    : none;
    }

    .game-modes-scroll::-webkit-scrollbar {
        display : none;
    }

    .game-modes {
        display : flex;
        width   : max-content;
    }

    .card {
        width                       : 13rem;
        height                      : 20rem;
        padding                     : 1.5rem;

        position                    : relative;
        z-index                     : 1;
        will-change                 : transform;

        margin-right                : 1rem;

        background                  : var(--yellow);
        border-radius               : .5rem;
        box-shadow                  : 0 .1rem 1.5rem rgba(0, 0, 0, .5);
        overflow                    : hidden;

        transition                  : transform .1s ease-in-out;

        cursor                      : pointer;

        -webkit-backface-visibility : hidden;
        -moz-backface-visibility    : hidden;
        -webkit-transform           : translate3d(0, 0, 0);
        -moz-transform              : translate3d(0, 0, 0);
    }

    .card.card--green {
        background : var(--green);
    }

    .card.card--red {
        background : var(--red);
    }

    .card.card--blue {
        background : var(--blue);
    }

    .card .icon {
        font-size : 15rem;
        color     : rgba(255, 255, 255, .4);

        position  : absolute;
        bottom    : -20%;
        left      : -20%;
    }

    .card .title {
        margin    : 0;
        font-size : 1.5em;
        color     : rgba(255, 255, 255, .9);
    }

    .card .description {
        margin-top : .3rem;
        font-size  : 1.1em;
        color      : var(--color-text-translucent);
    }

    .card:first-child {
        margin-left : 1.5rem;
    }

    .card:last-child {
        margin-right : 1.5rem;
    }

    .card:hover {
        transform : scale(1.05) translateY(-.1rem);
    }

    .actions {
        display : flex;
    }

    .actions .btn-2 {
        margin-right : 1rem;
        width        : 8rem;
    }

    .actions .btn-2:last-child {
        margin-right : 0;
    }
</style>
