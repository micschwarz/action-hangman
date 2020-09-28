import firebase from "firebase/app";

export class User {
    private state = UserState.LOGGING_IN;

    login(onChange: (state: UserState, user: firebase.User | null) => void) {
        firebase.auth().onAuthStateChanged((user) => {
            this.state = user !== null ? UserState.LOGGED_IN : UserState.LOGGED_OUT;
            onChange(this.state, user);
        });
    }

    signIn(email, password) {
        return firebase.auth()
            .signInWithEmailAndPassword(email, password);
    }

    getState() {
        return this.state;
    }
}


export enum UserState {
    LOGGING_IN,
    LOGGED_IN,
    LOGGED_OUT,
}
