<script lang="ts">
    export let actions;
</script>

<div class="btns">
    {#each actions as action (action)}
        <div class={`btn btn--no-click btn--${action.getColor()}`} class:btn--inactive={action.didRun()}>
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
