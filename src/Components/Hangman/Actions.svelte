<script lang="ts">
    import Icon from '../Icon.svelte';

    export let actions;
</script>

<div class="btns">
    {#each actions as action (action)}
        <div class={`btn-2 btn-2--square btn-2--compact btn-2--no-click btn-2--${action.getColor()}`}
             class:btn-2--disabled={action.didRun()}>
            <span class="btn-2-icon">
                <Icon name={action.getIcon()}/>
            </span>
        </div>
    {/each}
</div>

<style>
    .btns {
        display         : flex;
        justify-content : flex-start;
        width           : max-content;
    }

    .btns .btn-2 {
        margin-right : 1rem;
    }

    .btns .btn-2:last-child {
        margin-right : 0;
    }
</style>
