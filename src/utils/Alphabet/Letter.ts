export class Letter {
    private readonly value: string;
    private readonly label: string;
    private isLabelHidden: boolean = false;
    private used: boolean = false;
    private isUsedHidden: boolean = false;

    /**
     * Create a letter.
     *
     * @param value
     * @param view
     */
    constructor(value: string, view: string = undefined) {
        this.value = value;
        this.label = (view || value).toUpperCase();
    }

    /**
     * Get the label.
     */
    getLabel(): string {
        return this.isLabelHidden ? '?' : this.label;
    }

    /**
     * Set whether the label is viewable or not.
     *
     * @param isHidden
     */
    setLabelViewable(isHidden: boolean) {
        this.isLabelHidden = isHidden;
    }

    /**
     * Get the value of the letter.
     */
    getValue(): string {
        return this.value;
    }

    /**
     * Set the used state of the letter.
     *
     * @param isUsed
     */
    setUsed(isUsed: boolean) {
        this.used = isUsed;
    }

    /**
     * Returns whether the letter is used or not.
     */
    isUsed(): boolean {
        return this.isUsedHidden ? false : this.used;
    }

    /**
     * Set whether the state should be shown or hidden.
     *
     * @param isHidden
     */
    setUseViewable(isHidden: boolean) {
        this.isUsedHidden = isHidden;
    }

    /**
     * Compare if the value of the letter equals to given char.
     *
     * @param value
     */
    equals(value: string): boolean {
        return this.getValue() === value;
    }

    /**
     * Compare this letter to another.
     *
     * @param other
     */
    compare(other: Letter): number {
        const diff = this.getValue().charCodeAt(0) - other.getValue().charCodeAt(0);
        return Math.min(Math.max(diff, -1), 1);
    }
}
