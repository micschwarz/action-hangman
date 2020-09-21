<script lang="ts">
    import Hangman          from './Hangman.svelte';
    import { setContext }   from 'svelte';

    export let debug = false;

    setContext('debug', debug)
</script>

<Hangman/>
