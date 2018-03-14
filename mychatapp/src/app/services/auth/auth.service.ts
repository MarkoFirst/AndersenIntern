import {Injectable} from '@angular/core';

import {AngularFireAuth} from 'angularfire2/auth';

import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';
import {StoreService} from '../store/store.service';
import {DbService} from '../db/db.service';
import {MyUser} from '../../interfaces/all-interfaces';
import {User} from 'firebase/app';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  user: Observable<User>;
  logined: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(JSON.parse(localStorage.getItem('logged')));

  constructor(private firebaseAuth: AngularFireAuth,
              public  db: AngularFireDatabase,
              private myDb: DbService,
              private storeService: StoreService,
              private router: Router) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string, login: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
        // Get a key for a new Post.
        const newPostKey = this.myDb.getNewId('users');
        const postData = {
          login,
          id: newPostKey,
          password,
          mail: email
        };
        this.storeService.setUser({
          id: newPostKey,
          login,
          mail: email,
          password,
          chats: {}
        });
        // Write the new post's data simultaneously in the posts list and the user's post list.
        const updates = {};
        updates['/chats/' + newPostKey] = postData;
        this.logined = new BehaviorSubject<boolean>(true);
        localStorage.setItem('logged', JSON.stringify(true));
        this.router.navigateByUrl('/users');
        return this.db.database.ref().update(updates);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        this.logined = new BehaviorSubject<boolean>(true);
        localStorage.setItem('logged', JSON.stringify(true));
        this.myDb.selectDB('users', ref =>
          ref.orderByChild('mail').equalTo(value.email)).subscribe((users: MyUser[]) => {
          this.storeService.setUser(users[0]);
        });
        this.router.navigateByUrl('/users');
        console.log('Nice, it worked!', value);

      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  logout() {
    this.logined = new BehaviorSubject<boolean>(false);
    localStorage.setItem('logged', JSON.stringify(false));
    this.firebaseAuth
      .auth
      .signOut();
  }


}
