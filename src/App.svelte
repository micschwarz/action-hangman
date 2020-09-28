<script lang="ts">
    import Hangman  from './Hangman.svelte';
    import firebase from "firebase/app";
    import Login    from './Login.svelte';
    import Loading  from './Loading.svelte';
    import { fade } from 'svelte/transition';

    const USER_STATE = {
        LOGGING_IN   : 0,
        LOGGED_IN    : 1,
        NOT_LOGGED_IN: 2,
    }

    let userState = USER_STATE.LOGGING_IN;

    firebase.auth().onAuthStateChanged(function (user) {
        userState = !!user ? USER_STATE.LOGGED_IN : USER_STATE.NOT_LOGGED_IN;
    });
</script>

{#if userState === USER_STATE.LOGGED_IN}
    <Hangman/>
{:else if userState === USER_STATE.NOT_LOGGED_IN}
    <Login/>
{:else if userState === USER_STATE.LOGGING_IN}
    <div class="screen-loader" out:fade={{delay: 100, duration: 100}}>
        <Loading/>
    </div>
{/if}


<style>
    .screen-loader {
        position   : absolute;
        top        : 0;
        left       : 0;

        background : var(--color-background);
        z-index    : 100;
    }
</style>
