export interface WordManager {
    fetch(): Promise<string>;
}

export enum WordManagerErrors {
    ABORT
}
