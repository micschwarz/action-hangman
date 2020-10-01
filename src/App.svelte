<script lang="ts">
    import { Router, Route }         from 'svelte-routing';
    import Login                     from './Pages/Login.svelte';
    import Loading                   from './Pages/Loading.svelte';
    import { User, UserState }       from './services/user/User';
    import MainMenu                  from './Pages/MainMenu.svelte';
    import Profile                   from './Pages/Profile.svelte';
    import GameManager               from './Pages/GameManager.svelte';
    import { onDestroy, setContext } from 'svelte';
    import PopupOutlet               from './Components/Popups/PopupOutlet.svelte';

    export let config;

    const user    = new User();
    let userState = user.getState();

    // Listen to user login
    const unsubUserChange = user.login((state) => userState = state);
    onDestroy(unsubUserChange);

    // Set user as global context
    setContext('user', user);
    setContext('config', config);
</script>

<PopupOutlet/>
{#if userState === UserState.LOGGING_IN}>
    <Loading/>
{:else if userState === UserState.LOGGED_OUT}
    <Login {user}/>
{:else if userState === UserState.LOGGED_IN}
    <Router>
        <Route path="/" component={MainMenu}/>
        <Route path="/game" component={GameManager}/>
        <Route path="/profile" component={Profile}/>
    </Router>
{/if}





