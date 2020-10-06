<script>
    import Icon         from '../Icon.svelte';
    import { navigate } from 'svelte-routing';

    const abort = () => {
        navigate('/');
    };
</script>

<div class="game-menu">
    <h3>Menü</h3>
    <div class="actions">
        <button class="btn-2 btn-2--red btn-2--flat" on:click={abort}>
            <span class="btn-2-icon">
                <Icon name="home-alt"/>
            </span>
            Beenden
        </button>
    </div>
</div>

<style lang="scss">
    .game-menu {
        padding: 1rem;
        background: var(--color-background);
        box-shadow: 0 .1rem 1.5rem rgba(0, 0, 0, .5);

        border-radius: .5rem;

        h3 {
            margin: 0;
            font-size: 1.4em;
        }

        .actions {
            margin-top: 1rem;
        }
    }
</style>
