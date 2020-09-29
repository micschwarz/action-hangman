import OneVsOnePopup            from '../../Components/Popups/OneVsOnePopup.svelte';
import { LocalWord }            from './LocalWord';
import firebase                 from 'firebase/app';
import type { User }            from '../user/User';
import type { Game }            from '../../utils/Game';
import type { MultiplayerWord } from './MultiplayerWord';

export class OneVsOneWord implements MultiplayerWord {

    private readonly collection;

    private gameStarted = false;
    private resolve;
    private game: Game;
    private gameId;

    constructor(game: Game) {
        this.game       = game;
        this.collection = firebase.firestore().collection('games_one_v_one');
    }

    fetch(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.resolve = resolve;
        });
    }

    getAwaitPopup() {
        return OneVsOnePopup;
    }

    private fetchRandomWord(): Promise<string> {
        const localWord = new LocalWord();

        return localWord.fetch();
    }

    private createUUID() {
        // @ts-ignore
        return ([1e3] + 1e1).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16),
        );
    }

    private listenForJoin(document) {
        document.onSnapshot((documentRef) => {
            const game = documentRef.data();
            if (!this.gameStarted && game.player2 !== null) {
                this.game.setMultiplayerDocument(document, true);
                this.resolve(game.word);
            }
        });
    }

    createGame(user: User): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.fetchRandomWord()
                .then((word) => {
                    const gameId = this.createUUID();

                    this.gameId = gameId;

                    const game = this.collection.doc(gameId);
                    game
                        .set({
                            player1      : user.getUid(),
                            player2      : null,
                            roundsPlayer1: null,
                            roundsPlayer2: null,
                            createdAt    : firebase.firestore.FieldValue.serverTimestamp(),
                            word         : word,
                        })
                        .then(() => {
                            game.get()
                                .then(() => this.listenForJoin(game))
                                .then(() => resolve(gameId))
                                .catch(reject);
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    }

    joinGame(user: User, gameId: string): Promise<undefined> {
        return new Promise((resolve, reject) => {
            const game = this.collection.doc(gameId);

            game.get()
                .then((documentRef) => {
                    if (!documentRef.exists) {
                        return reject('GAME_NOT_EXISTS');
                    }

                    const gameData = documentRef.data();
                    if (gameData.player2 !== null) {
                        reject('GAME_ALREADY_FULL');
                        return;
                    }

                    this.gameId = gameId;
                    this.game.setMultiplayerDocument(game, gameData.player1 === user.getUid());

                    // Rejoin game
                    if (gameData.player1 === user.getUid()) {
                        this.resolve(gameData.word);
                        resolve();
                        return;
                    }

                    return gameData.word;
                })
                .then((word) => {
                    // Player 1 join
                    if (word === undefined) {
                        return;
                    }

                    game
                        .set({
                            player2: user.getUid(),
                        }, { merge: true })
                        .then(() => {
                            this.resolve(word);
                            resolve();
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    }

    setRounds(rounds: number) {
        const update                                                      = {};
        update[this.game.isPlayer1() ? 'roundsPlayer1' : 'roundsPlayer2'] = rounds;

        this.collection
            .doc(this.gameId)
            .set(update, { merge: true });
    }
}
