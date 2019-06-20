import { Component, OnInit } from '@angular/core';
import { Store }        from '@ngrx/store';
import { Observable }   from 'rxjs';

import { User }         from './models/user';
import * as userActions from './actions/user.action';

interface AppState {
  user: User;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  user$: Observable<User>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.user$ = this.store.select('user');
    console.log(this.store.select('user'));

    this.store.dispatch(new userActions.GetUser());
  }

  googleLogin() {
    this.store.dispatch(new userActions.GoogleLogin());
    console.log(this.store.dispatch(new userActions.GoogleLogin()));
  }

  logout() {
    this.store.dispatch(new userActions.Logout());
  }

}