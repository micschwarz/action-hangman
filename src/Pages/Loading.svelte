<script>
    import Logo     from '../Components/Logo.svelte';
    import { fade } from 'svelte/transition';
    import Loader   from '../Components/Loader/Loader.svelte';
</script>
<main class="screen-loading" out:fade={{delay: 100, duration: 100}}>
    <Logo/>
    <div class="login-loader">
        <Loader/>
    </div>
</main>

<style>
    .screen-loading {
        width           : 100vw;
        height          : 100vh;

        display         : flex;
        justify-content : center;
        align-items     : center;
        flex-direction  : column;

        position        : absolute;
        top             : 0;
        left            : 0;

        background      : var(--color-background);
        z-index         : 1000;
    }

    .hangman-logo {
        width  : 8rem;
        height : 8rem;
    }

    .login-loader {
        margin-top : .5rem;
    }
</style>
