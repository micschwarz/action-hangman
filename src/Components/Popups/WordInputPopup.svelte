<script>
    import Popup from '../Helper/Popup.svelte';
    import Icon  from '../Icon.svelte';

    export let game;
    let word = "";

    /* Validation */

    let hasMinLength;
    $: hasMinLength = word.length >= 2;

    let hasMaxLength;
    $: hasMaxLength = word.length <= 6;

    let hasValidAlphabet;
    $: hasValidAlphabet = /^[a-z]*$/i.test(word);

    let isValid;
    $: isValid = hasMinLength && hasMaxLength && hasValidAlphabet;

    let isNotEmpty = false;
    $: isNotEmpty = word.length > 0;

    const startGame = () => {
        game.getWordService().resolve(word);
        word = "";
    }
</script>

<Popup {...$$restProps}>
    <div class="popup-content">
        <h2>Wähle ein Wort!</h2>
        <form class="word-form">
            <label class="form-2 form-2--required" class:form-2--has-error={!isValid && isNotEmpty} for="word">
                <span class="form-2-label">Wort</span>
                <input class="form-2-input" type="text" name="word" id="word"
                       bind:value={word} maxlength="6" minlength="2" pattern="^[A-Za-z]*$" required>
                <span class="form-2-error">
                    {#if !hasMaxLength}
                        Die Maximallänge beträgt 6
                    {:else if !hasMinLength}
                        Die Minimallänge beträgt 2
                    {:else if !hasValidAlphabet}
                        Darf nur A-Z beinhalten
                    {:else}
                        Eingabe fehlerhaft
                    {/if}
                </span>
            </label>

            <div class="actions">
                <button type="submit" class="btn-2 btn-2--green" on:click|preventDefault={startGame}
                        disabled={!isValid}>
                    <span class="btn-2-icon"><Icon name="play"/></span>
                    Los gehts
                </button>
            </div>
        </form>
    </div>
</Popup>

<style>
    .popup-content {
        display         : flex;
        flex-direction  : column;
        justify-content : center;
        align-items     : center;

        padding         : 1.5rem;
    }

    .popup-content h2 {
        margin    : 0;
        font-size : 1.5em;
        color     : rgba(255, 255, 255, .95);
    }

    .word-form {
        margin-top : 1.5rem;
    }

    .actions {
        margin-top : 1rem;
    }
</style>
