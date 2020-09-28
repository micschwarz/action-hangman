import firebase from "firebase/app";

export class User {
    private state = UserState.LOGGING_IN;
    private email: string | null;
    private emailVerified: boolean;
    private uid: string | null;
    private photoURL: string | null;
    private displayName: string | null;

    login(onChange: (state: UserState, user: firebase.User | null) => void) {
        firebase.auth().onAuthStateChanged((user) => {
            this.state = user !== null ? UserState.LOGGED_IN : UserState.LOGGED_OUT;

            if (user) {
                this.email = user.email;
                this.emailVerified = user.emailVerified;
                this.uid = user.uid;
                this.photoURL = user.photoURL;
                this.displayName = user.displayName;
            }

            onChange(this.state, user);
        });
    }

    signIn(email, password) {
        return firebase.auth()
            .signInWithEmailAndPassword(email, password);
    }

    update(email: string, displayName: string | null) {
        const updateQue = [];
        const user = firebase.auth().currentUser;

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

    getState() {
        return this.state;
    }

    getDisplayName(): string | null {
        return this.displayName;
    }

    getEmail(): string | null {
        return this.email;
    }

    logout() {
        this.state = UserState.LOGGING_IN;
        firebase.auth()
            .signOut()
            .then(() => this.state = UserState.LOGGED_OUT)
            .catch(() => this.state = UserState.LOGGED_OUT);
    }
}


export enum UserState {
    LOGGING_IN,
    LOGGED_IN,
    LOGGED_OUT,
}
