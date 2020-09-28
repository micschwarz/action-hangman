<script>
    import Logo         from '../Components/Logo.svelte';
    import Icon         from '../Components/Icon.svelte';
    import { navigate } from "svelte-routing";

    const playSinglePlayer = () => {
        navigate('/game')
    }
</script>

<main class="menu">
    <div class="logo">
        <Logo size={4}/>
        <span class="logo-text">angman</span>
    </div>
    <nav class="navigation">
        <button class="btn" on:click={playSinglePlayer}>
            <span class="btn-media"><Icon name="play"/></span>
            Einzelspieler
        </button>
        <!--<button class="btn btn&#45;&#45;green">
            <span class="btn-media"><Icon name="user"/></span>
            User
        </button>-->
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
</style>
