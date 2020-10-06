<script lang="ts" context="module">
    import { GameManager } from '../Game/GameManager';

    export const gameManager = new GameManager();
    export let restartGame   = () => {
    };
</script>

<script lang="ts">
    import Hangman               from './Hangman.svelte';
    import { GameTypes }         from '../Game/GameType/GameType';
    import { WordManagerErrors } from '../Game/WordManager/WordManager';


    export let location;
    let gameType = location.state?.id || 'LOCAL';

    let currentGame = undefined;

    const handleGameCreationError = error => {
        currentGame = undefined;
        if (error !== WordManagerErrors.ABORT) {
            throw error;
        }
    };

    const handleGameCreation = game => currentGame = game;

    gameManager.start(new (GameTypes[gameType].type)())
        .then(handleGameCreation)
        .catch(handleGameCreationError);

    restartGame = () => {
        gameManager.restart()
            .then(handleGameCreation)
            .catch(handleGameCreationError);
    };
</script>

{#if currentGame !== undefined}
    {#each [currentGame] as game (game)}
        <Hangman {game}/>
    {/each}
{/if}
