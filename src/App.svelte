<script lang="ts">
    import Hangman             from './Hangman.svelte';
    import Login               from './Login.svelte';
    import Loading             from './Loading.svelte';
    import { fade }            from 'svelte/transition';
    import { User, UserState } from './services/user/User';

    const user = new User();
    let userState = user.getState();

    user.login((state) => {
        userState = state
    });
</script>

{#if userState === UserState.LOGGED_IN}
    <Hangman/>
{:else if userState === UserState.LOGGED_OUT}
    <Login {user}/>
{:else if userState === UserState.LOGGING_IN}
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
