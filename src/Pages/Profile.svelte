<script lang="ts">
    import Icon         from '../Components/Icon.svelte';
    import { navigate } from 'svelte-routing';

    export let user;

    let displayName = user.getDisplayName();
    let email = user.getEmail();

    let isValid;
    $: isValid = email !== "";

    let isLoading = false;

    let profileName = user.getDisplayName() || user.getEmail();

    const update = () => {
        isLoading = true;

        user.update(email, displayName === "" ? null : displayName)
            .then(() => profileName = user.getDisplayName() || user.getEmail())
            .finally(() => isLoading = false);
    }
</script>

<main class="profile">
    <h2>Profil</h2>

    <div class="user-profile">
        <div class="card">
            <div class="icon">
                <Icon name="trophy"/>
            </div>
            <h3 class="title">{profileName}</h3>
            <div class="description">
                Hier werden zukünftig deine Statistiken stehen!
            </div>
        </div>
    </div>

    <div class="user-change">
        <h3>Profil anpassen</h3>
        <div class="user-profile-form">
            <label class="form-2" for="displayName">
                <span class="form-2-label">Name</span>
                <input class="form-2-input" type="text" name="displayName" id="displayName"
                       bind:value={displayName}>
            </label>
            <label class="form-2 form-2--required" for="email">
                <span class="form-2-label">E-Mail</span>
                <input class="form-2-input" type="email" name="email" id="email"
                       required disabled value={email}>
            </label>
            <div class="actions">
                <button class="btn-2 btn-2--green" on:click|preventDefault={update} disabled="{!isValid || isLoading}">
                    {#if isLoading}
                        <span class="loader loader--sm loader--white"></span>
                    {:else}
                        <span class="btn-2-icon"><Icon name="save"/></span>
                        Speichern
                    {/if}
                </button>
                <button class="btn-2" on:click={() => navigate('/')}>
                    <span class="btn-2-icon"><Icon name="home-alt"/></span>
                    Zurück
                </button>
            </div>
        </div>

    </div>
</main>

<style>
    .profile {
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

    .user-profile {
        margin : 1.5rem 0;
    }

    .card {
        width         : 100%;
        height        : 10rem;
        padding       : 1.5rem;

        position      : relative;
        z-index       : 1;

        margin-right  : 1rem;

        background    : var(--yellow);
        border-radius : .5rem;
        box-shadow    : 0 .1rem 1.5rem rgba(0, 0, 0, .5);
        overflow      : hidden;
    }

    .card .icon {
        position  : absolute;
        bottom    : -3rem;
        right     : -5rem;
        font-size : 10rem;
        color     : rgba(255, 255, 255, .2);
    }

    .card .title {
        margin        : 0;
        font-size     : 1.5em;
        color         : rgba(255, 255, 255, .95);

        white-space   : nowrap;
        overflow      : hidden;
        text-overflow : ellipsis;
    }

    .card .description {
        margin-top : .3rem;
        font-size  : 1.1em;
        color      : var(--color-text-translucent);
    }

    .user-profile-form {
        display        : flex;
        flex-direction : column;
    }

    .user-profile-form .form-2 {
        margin-bottom : 1rem;
    }

    .user-profile-form .actions {
        display : flex;
    }

    .actions .btn-2 {
        margin-right : 1rem;
        width        : 50%;
        max-width    : 10rem;
    }

    .actions .btn-2:last-child {
        margin-right : 0;
    }
</style>
