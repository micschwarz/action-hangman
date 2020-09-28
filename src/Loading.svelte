<script>
    import Logo from './components/Logo.svelte';
</script>
<main class="screen-loading">
    <Logo/>
    <div class="loader"></div>
</main>

<style>
    .screen-loading {
        width           : 100vw;
        height          : 100vh;

        display         : flex;
        justify-content : center;
        align-items     : center;
        flex-direction  : column;
    }

    .hangman-logo {
        width  : 8rem;
        height : 8rem;
    }

    .loader {
        margin-top : .5rem;
    }
</style>
