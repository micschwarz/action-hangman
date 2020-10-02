<script lang="ts">
    export let actions;
</script>

<div class="btns">
    {#each actions as action (action)}
        <div class={`btn-2 btn-2--square btn-2--compact btn-2--no-click btn-2--${action.getColor()}`}
             class:btn-2--disabled={action.didRun()}>
            <i class={`uil uil-${action.getIcon()}`}></i>
        </div>
    {/each}
</div>

<style>
    .btns {
        display               : grid;
        grid-gap              : 1rem;
        grid-template-columns : repeat(3, 3rem);
        padding               : 1rem;
    }

    .btns .btn {
        display         : flex;
        justify-content : center;
        align-items     : center;
    }
</style>
