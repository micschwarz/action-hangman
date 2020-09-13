export class Letter {
    /**
     * Creates Letter.
     *
     * @param {string} value
     * @param {string} [view]
     * @constructor
     */
    constructor(value, view = undefined) {
        this._value = value;
        this._label = (view || value).toUpperCase();
        this._isLabelHidden = false;
        this._isUsed = false;
        this._isUsedHidden = false;
    }

    getLabel = () => {
        return this._isLabelHidden ? '?' : this._label;
    }

    setLabelViewable = (isHidden) => {
        this._isLabelHidden = isHidden;
    }

    getValue = () => {
        return this._value;
    }

    setUsed = (isUsed) => {
        this._isUsed = isUsed;
    }

    isUsed = () => {
        return this._isUsedHidden ? false : this._isUsed;
    }

    setUseViewable(isHidden) {
        this._isUsedHidden = isHidden;
    }

    equals = (value) => {
        return this.getValue() === value;
    }

    /**
     *
     * @param {Letter} other
     */
    compare = (other) => {
        const diff = this.getValue().charCodeAt(0) - other.getValue().charCodeAt(0);
        return Math.min(Math.max(diff, -1), 1);
    }
}
