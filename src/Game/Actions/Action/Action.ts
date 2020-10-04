import type { Game } from '../../Game';

export abstract class Action {
    private ran: boolean       = false;
    private roundsLeft: number = 0;

    /**
     * Returns whether the action can be executed or not.
     */
    canRun(): boolean {
        return true;
    }

    /**
     * Applies action effects.
     *
     * @return Number of rounds the effect will last.
     */
    protected abstract _run(game: Game): number;

    /**
     * Resets action effects.
     *
     * @private
     */
    protected abstract _reset(game: Game);

    /**
     * True if the action was executed.
     */
    didRun() {
        return this.ran;
    }

    /**
     * Execute action.
     */
    execute(game: Game) {
        if (this.didRun() || !this.canRun()) {
            throw new Error('Action is not allowed to be executed.');
        }

        this.roundsLeft = this._run(game);
        this.ran        = true;
    }

    /**
     * Updates Action.
     * Called every round.
     */
    update(game: Game) {
        if (this.didRun() && this.roundsLeft === 1) {
            this._reset(game);
        }

        if (this.roundsLeft > 0) {
            this.roundsLeft--;
        }
    }

    /**
     * Get action icon name
     */
    abstract getIcon(): string;

    /**
     * Get action name
     */
    abstract getName(): string;

    /**
     * Get action color.
     */
    getColor(): string {
        return 'yellow';
    }

    /**
     * Get description of action.
     */
    abstract getDescription(): string;
}
