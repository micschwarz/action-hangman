import { tweened }       from 'svelte/motion';
import { cubicOut }      from 'svelte/easing';
import firebase          from 'firebase/app';
import type { Readable } from 'svelte/store';

export interface ExperienceStore extends Readable<number> {
    increment(by: number): Promise<void>;
}

export class Statistics {
    private readonly experienceStore: ExperienceStore;

    constructor(uId: string) {
        this.experienceStore = this.createExperienceStore(uId);
    }

    createExperienceStore(uId: string): ExperienceStore {
        const { set, subscribe } = tweened<number>(0, {
            duration   : 200,
            easing     : cubicOut,
            interpolate: (start: number, end: number) => {
                // Make transition as integer
                return (t: number) => Math.round(start + (end - start) * t);
            },
        });

        const subStore = subscribe;

        const statisticsDocument = firebase.firestore().collection('statistics').doc(uId);

        return {
            subscribe(fn): () => void {
                const unsubStore = subStore(fn);
                const unsubDoc   = statisticsDocument.onSnapshot((documentRef) => {
                    if (documentRef.exists) {
                        set(documentRef.data().level);
                    } else {
                        set(0);
                    }
                });

                return () => {
                    unsubDoc();
                    unsubStore();
                };
            },
            increment(by: number): Promise<void> {
                return statisticsDocument.set({
                    level: firebase.firestore.FieldValue.increment(by),
                }, { merge: true });
            },
        };
    }

    /**
     * Get level store.
     */
    getExperienceStore() {
        return this.experienceStore;
    }

    getLevelByExperience(xp: number) {
        return Math.floor(0.9 * xp / 150);
    }

    getAmountXpByLevel(level: number) {
        return Math.ceil(level * 150 / 0.9);
    }
}
