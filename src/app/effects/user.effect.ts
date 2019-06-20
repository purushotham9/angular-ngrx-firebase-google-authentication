import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { User } from '../models/user';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

import { Observable } from 'Rxjs/Observable';
import 'Rxjs/add/observable/fromPromise';
import 'Rxjs/add/observable/of';

import 'Rxjs/add/operator/map';
import 'Rxjs/add/operator/switchMap';
import 'Rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import { filter } from 'Rxjs/operators';
import 'Rxjs/add/operator/filter';




import * as userActions from '../actions/user.action';
export type Action = userActions.All;


@Injectable()
export class UserEffects {

    constructor(private actions: Actions, private afAuth: AngularFireAuth) { }

    /// effects go here
    @Effect()
    getUser: Observable<Action> = this.actions.filter(action => action.type === userActions.GET_USER)

        .map((action: userActions.GetUser) => action.payload)
        .switchMap(payload => this.afAuth.authState)
        .delay(2000) // delay to show loading spinner, delete me!
        .map(authData => {
            if (authData) {
                /// User logged in
                const user = new User(authData.uid, authData.displayName);
                return new userActions.Authenticated(user);
            } else {
                /// User not logged in
                return new userActions.NotAuthenticated();
            }

        })
        .catch(err => Observable.of(new userActions.AuthError()));

    @Effect()
    login: Observable<Action> = this.actions.filter(action => action.type === userActions.GOOGLE_LOGIN)

        .map((action: userActions.GoogleLogin) => action.payload)
        .switchMap(payload => {
            return Observable.fromPromise(this.googleLogin());
        })
        .map(credential => {
            // successful login
            return new userActions.GetUser();
        })
        .catch(err => {
            return Observable.of(new userActions.AuthError({ error: err.message }));
        });


    private googleLogin(): Promise <any>{
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.afAuth.auth.signInWithPopup(provider);
    }

    @Effect()
    logout: Observable<Action> = this.actions.filter(action => action.type === userActions.LOGOUT)

        .map((action: userActions.Logout) => action.payload)
        .switchMap(payload => {
            return Observable.of(this.afAuth.auth.signOut());
        })
        .map(authData => {
            return new userActions.NotAuthenticated();
        })
        .catch(err => Observable.of(new userActions.AuthError({ error: err.message })));
}