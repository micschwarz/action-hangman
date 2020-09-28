<script lang="ts">
    import Icon         from '../Components/Icon.svelte';
    import { navigate } from 'svelte-routing';

    export let user;

    let displayName = user.getDisplayName();
    const email = user.getEmail();

    let isValid;
    $: isValid = email !== "";

    let isLoading = false;

    const update = () => {
        isLoading = true;

        user.update(email, displayName === "" ? null : displayName)
            .finally(() => isLoading = false);
    }
</script>

<main class="profile">
    <h2>Profil</h2>
    <label class="form" for="displayName">
        <span class="form-label">Name</span>
        <input class="form-input" type="text" name="displayName" id="displayName"
               placeholder="Nickname"
               bind:value={displayName}>
    </label>
    <label class="form form--required" for="email">
        <span class="form-label">E-Mail</span>
        <input class="form-input" type="email" name="email" id="email"
               placeholder="user@micschwarz.games" required disabled value={email}>
    </label>
    <div class="btns">
        <button class="btn btn--green" type="submit" on:click|preventDefault={update}
                disabled="{!isValid || isLoading}">
            {#if isLoading}
                <span class="loader loader--sm loader--white"></span>
            {:else}
                <span class="btn-media"><Icon name="save"/></span>
                Speichern
            {/if}
        </button>
        <button class="btn" on:click={() => navigate('/')}>
            <span class="btn-media"><Icon name="home-alt"/></span>
            Zurück
        </button>
    </div>
</main>

<style>
    .profile {
        padding        : 1rem;
        max-width      : 40rem;
        margin         : 0 auto;

        width          : 100%;

        display        : flex;
        flex-direction : column;
        align-items    : center;
    }

    .profile h2 {
        margin : 0;
    }

    .form {
        margin-bottom : 1rem;
    }

    .btns {
        width           : 100%;
        display         : flex;
        justify-content : center;
    }

    .btns .btn {
        width  : 7rem;
        margin : .5rem .5rem 0 0;
    }

    .btns .btn:last-child {
        margin-right : 0;
    }
</style>
