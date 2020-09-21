export abstract class Action {
    private ran: boolean = false;
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
    protected abstract _run(): number;

    /**
     * Resets action effects.
     *
     * @private
     */
    protected abstract _reset();

    /**
     * True if the action was executed.
     */
    didRun() {
        return this.ran
    }

    /**
     * Execute action.
     */
    execute() {
        if (this.didRun() || !this.canRun()) {
            throw new Error('Action is not allowed to be executed.')
        }

        this.roundsLeft = this._run();
        this.ran = true;
    }

    /**
     * Updates Action.
     * Called every round.
     */
    update() {
        if (this.didRun() && this.roundsLeft === 1) {
            this._reset();
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
     * Get action color.
     */
    getColor(): string {
        return 'red'
    }
}
