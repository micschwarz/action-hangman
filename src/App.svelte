<script lang="ts">
    import Hangman  from './Hangman.svelte';
    import firebase from "firebase/app";
    import Login    from './Login.svelte';

    let userLoggedIn = false;

    firebase.auth().onAuthStateChanged(function (user) {
        userLoggedIn = !!user;
    });
</script>

{#if userLoggedIn}
    <Hangman/>
{:else}
    <Login/>
{/if}
