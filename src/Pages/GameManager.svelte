<script lang="ts" context="module">
    import { GameManager } from '../utils/GameManager';

    export const gameManager = new GameManager();
</script>

<script lang="ts">
    import Hangman from './Hangman.svelte';


    export let location;
    let gameType = location.state?.gameTypeId;

    gameManager.start(gameType);

    let currentGameStore = gameManager.getCurrentGame();
</script>

{#each [$currentGameStore] as game (game)}
    <Hangman {game}/>
{/each}
