export class Letter {
    private readonly value: string;
    private label: string;
    private used: boolean = false;
    private isUsedHidden: boolean = false;

    /**
     * Create a letter.
     *
     * @param value
     */
    constructor(value: string) {
        this.value = value;
        this.resetLabel();
    }

    /**
     * Get the label.
     */
    getLabel(): string {
        return this.label;
    }

    /**
     * Set the label.
     *
     * @param label
     */
    setLabel(label: string) {
        this.label = label.toUpperCase();
    }

    resetLabel() {
        this.label = this.value.toUpperCase();
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
    setUseHidden(isHidden: boolean) {
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
