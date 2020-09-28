<script lang="ts">
    import Icon from '../Components/Icon.svelte';

    export let user;

    let email = "";
    let password = "";

    let isValid;
    $: isValid = email !== "" && password !== "";

    let errorEmail = false;
    let errorPassword = false;

    let isLoading = false;

    const removeErrors = () => {
        errorEmail = false;
        errorPassword = false;
    }

    const login = () => {
        isLoading = true;
        removeErrors();

        user.signIn(email, password)
            .catch((error) => {
                switch (error.code) {
                    case 'auth/user-not-found':
                    case 'auth/invalid-email':
                        errorEmail = true;
                        break;
                    case 'auth/wrong-password':
                        errorPassword = true;
                        break;
                }
            })
            .finally(() => isLoading = false);
    }

</script>

<main class="login">
    <h2>Willkommen!</h2>
    <div class="greeting">
        Bitte melde dich an, um Hangman spielen zu können.
    </div>

    <form class="login-form">
        <label class="form-2 form-2--required" class:form-2--has-error={errorEmail} for="email">
            <span class="form-2-label">E-Mail</span>
            <input class="form-2-input" type="email" name="email" id="email"
                   bind:value={email} on:input={removeErrors} required>
            <span class="form-2-error">Nutzer nicht korrekt</span>
        </label>

        <label class="form-2 form-2--required" class:form-2--has-error={errorPassword} for="password">
            <span class="form-2-label">Passwort</span>
            <input class="form-2-input" type="password" name="password" id="password"
                   bind:value={password} on:input={removeErrors} required>
            <span class="form-2-error">Passwort nicht korrekt</span>
        </label>

        <div class="actions">
            <button class="btn-2" type="submit" on:click|preventDefault={login} disabled="{!isValid || isLoading}">
                {#if isLoading}
                    <span class="loader loader--sm loader--white"></span>
                {:else}
                    <span class="btn-2-icon"><Icon name="sign-in-alt"/></span>
                    Anmelden
                {/if}
            </button>
        </div>
    </form>
    <!-- <form class="form-login">
         <label class="form" class:form&#45;&#45;has-error={errorEmail} for="email">
             <span class="form-label">E-Mail</span>
             <input class="form-input" type="email" name="email" id="email"
                    placeholder="user@micschwarz.games"
                    bind:value={email} on:input={removeErrors}>
             <span class="form-error">Nutzer nicht korrekt</span>
         </label>

         <label class="form" class:form&#45;&#45;has-error={errorPassword} for="password">
             <span class="form-label">Passwort</span>
             <input class="form-input" type="password" name="password" id="password"
                    placeholder="*********"
                    bind:value={password} on:input={removeErrors}>
             <span class="form-error">Passwort nicht korrekt</span>
         </label>

         <button class="btn" type="submit" on:click|preventDefault={login} disabled="{!isValid || isLoading}">
             {#if isLoading}
                 <span class="loader loader&#45;&#45;sm loader&#45;&#45;white"></span>
             {:else}
                 Anmelden
             {/if}
         </button>
     </form>-->
</main>


<style>
    .login {
        padding   : 1.5rem;
        max-width : 40rem;
        width     : 100%;
        margin    : 0 auto;
    }

    h2 {
        margin      : 0;
        font-size   : 1.8em;
        font-weight : bold;
    }

    .greeting {
        margin : .5rem 0;
        color  : var(--color-text-darken);
    }

    .login-form {
        display        : flex;
        flex-direction : column;
    }

    .login-form .form-2 {
        margin-bottom : 1rem;
    }

    .login-form .actions {
        display : flex;
    }

    .login-form .actions .btn-2 {
        margin-right : 1rem;
        width        : 50%;
        max-width    : 10rem;
    }

    .login-form .actions .btn-2:last-child {
        margin-right : 0;
    }
</style>
