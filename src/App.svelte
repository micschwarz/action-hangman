<script lang="ts">
    import { Router, Route }   from "svelte-routing";
    import Hangman             from './Pages/Hangman.svelte';
    import Login               from './Pages/Login.svelte';
    import Loading             from './Pages/Loading.svelte';
    import { User, UserState } from './services/user/User';
    import MainMenu            from './Pages/MainMenu.svelte';

    const user = new User();
    let userState = user.getState();

    user.login((state) => {
        userState = state
    });
</script>

{#if userState === UserState.LOGGING_IN}
    <Loading/>
{:else if userState === UserState.LOGGED_OUT}
    <Login {user}/>
{:else if userState === UserState.LOGGED_IN}
    <Router>
        <Route path="/" component={MainMenu}/>
        <Route path="/game" component={Hangman}/>
    </Router>
{/if}





