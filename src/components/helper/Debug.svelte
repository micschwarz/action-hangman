<script lang="ts">
    import { lettersStore }    from '../../stores/letters';
    import { wordStoreMaster } from '../../stores/word';

    let isLabelHidden = false;
    const toggleLabelHidden = () => {
        isLabelHidden = !isLabelHidden;
        lettersStore.hideLabel(isLabelHidden);
    }

    let isUsedHidden = false;
    const toggleUsedHidden = () => {
        isUsedHidden = !isUsedHidden;
        lettersStore.hideUsed(isUsedHidden);
    }
</script>

<div class="btns">
    <button class="btn btn--secondary" on:click={toggleLabelHidden}>
        {#if isLabelHidden}
            Show Label
        {:else}
            Hide Label
        {/if}
    </button>
    <button class="btn btn--secondary" on:click={toggleUsedHidden}>
        {#if isUsedHidden}
            Show Used
        {:else}
            Hide Used
        {/if}
    </button>
</div>
<div class="info">
    <ul>
        <li><b>Word:</b> {$wordStoreMaster}</li>
    </ul>
</div>

<style>
    .btns {
        display               : grid;
        grid-gap              : 1rem;
        grid-template-columns : repeat(2, 7rem);
        justify-content       : center;
        padding               : 1rem;
    }

    .info {
        display         : flex;
        justify-content : center;

        padding         : 1rem;
    }

    .info ul {
        list-style-type : none;
        padding         : 0;
        margin          : 0;
    }
</style>
