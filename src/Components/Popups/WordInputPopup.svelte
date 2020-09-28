<script>
    import Popup from '../Helper/Popup.svelte';
    import Icon  from '../Icon.svelte';

    export let game;
    let word = "";

    let isValid;
    $: isValid = word.length <= 6 && word.length >= 2;

    const startGame = () => {
        game.getWordService().resolve(word);
        word = "";
    }
</script>

<Popup {...$$restProps}>
    <div class="popup-content">
        <h2>Wort Eingabe</h2>
        <form class="word-form">
            <label class="form form--required" class:form--has-error={!isValid} for="word">
                <span class="form-label">Wort</span>
                <input class="form-input" type="text" name="word" id="word"
                       placeholder="Super" maxlength="6" required
                       bind:value={word}>
                <span class="form-error">Das Wort muss zwischen 2 und 6 Zeichen haben</span>
            </label>
            <button class="btn btn--green" type="submit" on:click|preventDefault={startGame} disabled="{!isValid}">
                <span class="btn-media"><Icon name="play"/></span>
                Los gehts
            </button>
        </form>
    </div>
</Popup>

<style>
    .popup-content {
        display         : flex;
        flex-direction  : column;
        justify-content : center;
        align-items     : center;
    }

    .word-form {
        display        : flex;
        flex-direction : column;
        align-items    : center;

        width          : 100%;
    }

    .word-form .form {
        margin-bottom : 1rem;
        width         : 19rem;
    }

    .word-form .btn {
        width      : 10rem;
        margin-top : .5rem;
    }

    h2 {
        margin : 0 0 1rem;
    }
</style>
