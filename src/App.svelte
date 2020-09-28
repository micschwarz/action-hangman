<script lang="ts">
    import Hangman             from './Hangman.svelte';
    import Login               from './Login.svelte';
    import Loading             from './Loading.svelte';
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
    <Loading/>
{/if}
