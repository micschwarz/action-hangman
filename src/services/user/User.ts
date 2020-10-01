import firebase              from 'firebase/app';
import { StatisticsService } from '../statistics/StatisticsService';

export class User {
    /**
     * Users email.
     * Null if user is not logged in.
     * @private
     */
    private email: string | null;

    /**
     * True if users email is verified.
     * @private
     */
    private emailVerified: boolean = false;

    /**
     * Users unique id.
     * Null if user is not logged in.
     * @private
     */
    private uid: string | null;

    /**
     * Users photo url.
     * Null if user is not logged in.
     * @private
     */
    private photoURL: string | null;

    /**
     * Users display name.
     * Null if user is not logged in or not set.
     * @private
     */
    private displayName: string | null;

    /**
     * Statistic service for statistics connected to the user.
     * Null if user is not logged in.
     * @private
     */
    private statisticsService: StatisticsService | null = null;

    /**
     * Users current auth state.
     * @private
     */
    private state: UserState = UserState.LOGGING_IN;

    /**
     * Listen for user auth changes.
     *
     * @param onChange
     */
    login(onChange: (state: UserState, user: firebase.User | null) => void): firebase.Unsubscribe {
        return firebase.auth().onAuthStateChanged((user) => {
            this.state = user !== null ? UserState.LOGGED_IN : UserState.LOGGED_OUT;

            if (user) {
                this.email             = user.email;
                this.emailVerified     = user.emailVerified;
                this.uid               = user.uid;
                this.photoURL          = user.photoURL;
                this.displayName       = user.displayName;
                this.statisticsService = new StatisticsService(user.uid);
            }

            onChange(this.state, user);
        });
    }

    /**
     * Sign in the user with given credentials.
     *
     * @param email
     * @param password
     */
    signIn(email: string, password: string): Promise<firebase.auth.UserCredential> {
        return firebase.auth()
            .signInWithEmailAndPassword(email, password);
    }

    /**
     * Update user information.
     *
     * @param email
     * @param displayName
     */
    update(email: string, displayName: string | null): Promise<void[]> {
        const updateQue = [];
        const user      = firebase.auth().currentUser;

        if (email !== this.email) {
            this.email = email;
            updateQue.push(user.updateEmail(email));
        }

        if (displayName !== this.displayName) {
            this.displayName = displayName;
            updateQue.push(user.updateProfile({ displayName }));
        }

        return Promise.all(updateQue);
    }

    /**
     * Get current auth state.
     */
    getState(): UserState {
        return this.state;
    }

    /**
     * Get display name of user.
     * Null if not logged in.
     */
    getDisplayName(): string | null {
        return this.displayName;
    }

    /**
     * Get email of user.
     * Null if not logged in.
     */
    getEmail(): string | null {
        return this.email;
    }

    /**
     * Get uuid of user.
     * Null if not logged in.
     */
    getUid(): string | null {
        return this.uid;
    }

    /**
     * Logout user.
     */
    logout(): void {
        this.state = UserState.LOGGING_IN;
        firebase.auth()
            .signOut()
            .then(() => this.state = UserState.LOGGED_OUT)
            .catch(() => this.state = UserState.LOGGED_OUT);
    }

    /**
     * Get statistics service for current user.
     * Null if not logged in.
     */
    getStatisticsService(): StatisticsService | null {
        return this.statisticsService;
    }
}

/**
 * Current auth state.
 */
export enum UserState {
    LOGGING_IN,
    LOGGED_IN,
    LOGGED_OUT,
}
