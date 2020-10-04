<script lang="ts" context="module">
    import { GameManager } from '../Game/GameManager';

    export const gameManager = new GameManager();
    export let restartGame   = () => {
    };
</script>

<script lang="ts">
    import Hangman       from './Hangman.svelte';
    import { GameTypes } from '../Game/GameType/GameType';


    export let location;
    let gameType = location.state?.id || 'LOCAL';

    let currentGame = undefined;

    gameManager.start(new (GameTypes[gameType].type)())
        .then(game => currentGame = game);

    restartGame = () => {
        gameManager.restart()
            .then(game => currentGame = game);
    };
</script>

{#if currentGame !== undefined}
    {#each [currentGame] as game (game)}
        <Hangman {game}/>
    {/each}
{/if}
