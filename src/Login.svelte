<script lang="ts">
    import firebase from "firebase/app";

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

        firebase.auth()
            .signInWithEmailAndPassword(email, password)
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

<main>
    <h2>Einloggen</h2>

    <form class="form-login">
        <label class="form" class:form--has-error={errorEmail} for="email">
            <span class="form-label">Nutzername</span>
            <input class="form-input" type="email" name="email" id="email"
                   placeholder="user@micschwarz.games"
                   bind:value={email} on:input={removeErrors}>
            <span class="form-error">Nutzer nicht korrekt</span>
        </label>

        <label class="form" class:form--has-error={errorPassword} for="password">
            <span class="form-label">Passwort</span>
            <input class="form-input" type="password" name="password" id="password"
                   placeholder="*********"
                   bind:value={password} on:input={removeErrors}>
            <span class="form-error">Passwort nicht korrekt</span>
        </label>

        <button class="btn" type="submit" on:click|preventDefault={login} disabled="{!isValid || isLoading}">
            {#if isLoading}
                <span class="loader loader--sm loader--white"></span>
            {:else}
                Anmelden
            {/if}
        </button>
    </form>
</main>


<style>
    main {
        padding        : 1rem;

        display        : flex;
        flex-direction : column;
        align-items    : center;
    }

    .form-login {
        width          : 100%;

        display        : flex;
        flex-direction : column;
        align-items    : center;
    }

    .form-login .form {
        margin-bottom : 1rem;
    }

    .form-login .btn {
        width      : 50%;
        margin-top : .5rem;
    }
</style>
