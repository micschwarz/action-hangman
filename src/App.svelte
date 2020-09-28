<script lang="ts">
    import Hangman             from './Pages/Hangman.svelte';
    import Login               from './Pages/Login.svelte';
    import Loading             from './Pages/Loading.svelte';
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
