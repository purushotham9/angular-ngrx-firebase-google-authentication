import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
import { userReducer } from './reducers/user.reducer';
import {postReducer}  from './reducers/post.reducer'; 
import { FormsModule } from '@angular/forms';


import { AngularFireModule } from 'angularFire2';
import { AngularFireDatabaseModule } from 'angularFire2/database';
// for auth    
import {AngularFireAuthModule} from 'angularfire2/auth';
// for database
// import {AngularFireDatabaseModule} from 'angularfire2/database';
const firebaseConfig = {
  apiKey: "AIzaSyBZztvNGIfe7yxz8ZqmigCKm0Bu2RorTLI",
  authDomain: "fisrt-deploy.firebaseapp.com",
  databaseURL: "https://fisrt-deploy.firebaseio.com",
  projectId: "fisrt-deploy",
  storageBucket: "fisrt-deploy.appspot.com",
  messagingSenderId: "529524062402",
  appId: "1:529524062402:web:84cd5940c6204002"
};



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    StoreModule.forRoot({
      user: userReducer
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
