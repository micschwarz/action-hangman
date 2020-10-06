import type { WordManager }                       from './WordManager';
import { WordManagerErrors }                      from './WordManager';
import { LocalWord }                              from '../../services/word/LocalWord';
// @ts-ignore
import { close as closePopup, open as openPopup } from '../../Components/Popups/PopupOutlet.svelte';
import OneVsOnePopup                              from '../../Components/Popups/OneVsOnePopup.svelte';
import firebase                                   from 'firebase/app';
import { currentUser }                            from '../../services/user/User';
import CollectionReference = firebase.firestore.CollectionReference;
import DocumentReference = firebase.firestore.DocumentReference;

export enum Player {
    ONE = 1,
    TWO = 2
}

export interface GameData {
    player1: string | null,
    player2: string | null,
    roundsPlayer1: number | null,
    roundsPlayer2: number | null,
    createdAt: Date,
    word: string,
}

export class OneVsOneWordManager implements WordManager {
    /**
     * Reference to the one vs one game db collection.
     *
     * @private
     */
    private readonly collection: CollectionReference;

    /**
     * Reference to the current one vs one game.
     *
     * @private
     */
    private document: DocumentReference;

    /**
     * Resolve word after second user is joined.
     *
     * @private
     */
    private resolve: (word: string) => void;

    /**
     * Reject word creation.
     *
     * @private
     */
    private reject: (reason: WordManagerErrors) => void;

    /**
     * Player number.
     * Player.ONE is the host. Player.TWO is the guest.
     *
     * @private
     */
    private player: Player;

    constructor() {
        this.collection = firebase.firestore().collection('games_one_v_one');
    }

    fetch(): Promise<string> {
        openPopup(OneVsOnePopup, { wordManager: this });

        return new Promise<string>((resolve, reject) => {
            this.resolve = resolve;
            this.reject  = reject;
        }).finally(() => closePopup(OneVsOnePopup));
    }

    /**
     * Get reference to the game document.
     */
    getGameDocument(): DocumentReference {
        return this.document;
    }

    /**
     * Get the player.
     */
    getPlayer(): Player {
        return this.player;
    }

    /**
     * Create a one vs one game.
     */
    createGame(): Promise<string> {
        return new Promise<string>(async (resolve) => {
            const gameId = this.createUUID();

            this.player   = Player.ONE;
            this.document = this.collection.doc(gameId);

            const word = await new LocalWord().fetch();

            await this.document.set({
                player1      : currentUser.getUid(),
                player2      : null,
                roundsPlayer1: null,
                roundsPlayer2: null,
                createdAt    : firebase.firestore.FieldValue.serverTimestamp(),
                word         : word,
            });

            this.listenForJoin();
            resolve(gameId);
        });
    }

    /**
     * Join a game.
     *
     * @param gameId
     */
    joinGame(gameId: string): Promise<undefined> {
        return new Promise<undefined>(async (resolve, reject) => {

            this.collection
                .doc(gameId)
                .get()
                // Test if given gameId exists
                .then(documentRef => {
                    if (!documentRef.exists) {
                        return reject('GAME_NOT_EXISTS');
                    }

                    this.document = this.collection.doc(gameId);

                    return documentRef.data();
                })
                // Test if player rejoins
                .then((gameData: GameData) => {
                    if (gameData.player1 === currentUser.getUid()) {
                        this.player = Player.ONE;
                        this.listenForJoin();
                        return undefined;
                    }

                    if (gameData.player2 === currentUser.getUid()) {
                        this.player = Player.TWO;
                        this.resolve(gameData.word);
                        resolve();
                        return undefined;
                    }

                    return gameData;
                })
                .then((gameData: GameData | undefined) => {
                    if (gameData === undefined) {
                        return undefined;
                    }

                    if (gameData.player2 !== null) {
                        reject('GAME_ALREADY_FULL');
                        return undefined;
                    }

                    return gameData.word;
                })
                // Join the game
                .then(async (word: string | undefined) => {
                    // Rejoin
                    if (word === undefined) {
                        return;
                    }

                    this.player = Player.TWO;
                    await this.document.set({ player2: currentUser.getUid() }, { merge: true });
                    this.resolve(word);
                    resolve();
                })
                .catch(reject);
        });
    }

    /**
     * Abort one vs one game creation.
     */
    abort() {
        if (this.reject) {
            this.reject(WordManagerErrors.ABORT);
        }
    }

    /**
     * Listen for player join.
     *
     * @private
     */
    private listenForJoin() {
        const unsub = this.document.onSnapshot(documentRef => {
            const game = documentRef.data();
            if (game.player2 !== null) {
                unsub(); // Unsub change listener to prevent memory leak
                this.resolve(game.word);
            }
        });
    }

    /**
     * Create a game id.
     *
     * @private
     */
    private createUUID() {
        // @ts-ignore
        return ([1e3] + 1e1).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16),
        );
    }
}
