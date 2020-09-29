import firebase from "firebase/app";

export interface Statistics {
    gamesPlayed: number;
    gamesWon: number;
}

export class StatisticsService {
    private readonly document;
    private uid;

    constructor(uid: string) {
        this.document = firebase.firestore().collection('statistics').doc(uid);
        this.uid = uid;
    }

    get(): Promise<Statistics> {
        return new Promise((resolve, reject) => {
            this.document
                .get()
                .then((documentRef) => {
                    if (documentRef.exists) {
                        resolve(documentRef.data());
                        return;
                    }

                    this.create()
                        .then(() => {
                            this.get().then(resolve).catch(reject)
                        })
                        .catch(reject);
                })
                .catch(reject);
        })
    }

    private create(): Promise<undefined> {
        return this.document.set({
            gamesPlayed: 0,
            gamesWon   : 0,
        });
    }

    addGameLost(): Promise<undefined> {
        return this.document.update({
            gamesPlayed: firebase.firestore.FieldValue.increment(1),
        });
    }

    addGameWon(): Promise<undefined> {
        return this.document.update({
            gamesPlayed: firebase.firestore.FieldValue.increment(1),
            gamesWon   : firebase.firestore.FieldValue.increment(1),
        });
    }
}
