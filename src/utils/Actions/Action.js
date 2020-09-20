export class Action {
    constructor() {
        this._ran = false;
        this._roundsLeft = 0;
    }

    /**
     * Returns whether the action can be executed or not.
     *
     * @returns {boolean}
     */
    canRun() {
        return true;
    }

    /**
     * Applies action effects.
     *
     * @return {number} Number of rounds the effect will last.
     * @private
     */
    _run() {
        throw new Error('Run not implemented.');
    }

    /**
     * Resets action effects.
     *
     * @private
     */
    _reset() {
        throw new Error('Reset not implemented.')
    }

    /**
     * True if the action was executed.
     *
     * @return {boolean}
     */
    didRun() {
        return this._ran
    }

    /**
     * Execute action.
     */
    execute() {
        if (this.didRun() || !this.canRun()) {
            throw new Error('Action is not allowed to be executed.')
        }

        this._roundsLeft = this._run();
        this._ran = true;
    }

    update() {
        if (this.didRun() && this._roundsLeft === 1) {
            this._reset();
        }

        if (this._roundsLeft > 0) {
            this._roundsLeft--;
        }
    }

    getIcon() {
        return '';
    }

    getColor() {
        return 'red'
    }
}
