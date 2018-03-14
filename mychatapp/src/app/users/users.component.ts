import {Component, Injectable, OnInit} from '@angular/core';
import {StoreService} from '../services/store/store.service';
import {DbService} from '../services/db/db.service';
import {Router} from '@angular/router';
import {Chat, MyUser} from '../interfaces/all-interfaces';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
@Injectable()
export class UsersComponent implements OnInit {

  users: MyUser[] = [];
  usersStart: MyUser[] = [];
  currentUser: MyUser;
  chatId: string;

  constructor(public db: DbService, private storeService: StoreService, private router: Router, private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Пользователи');
    this.db.selectDB<MyUser>('users').subscribe(users => {
        this.usersStart = users;
        this.users = users;
      }
    );
    this.storeService.user.subscribe((user: MyUser) => {
      this.currentUser = user;
    });
  }

  start(event: any) {
    if (event.target.value !== '') {
      const arr = [];
      for (const i of this.users) {
        if (i.login.slice(0, event.target.value.length) === event.target.value) {
          arr.push(i);
        }
      }
      this.users = arr;
    } else {
      this.users = this.usersStart;
    }
  }

  checkChat(chat: string) {

    if (this.currentUser.chats[chat] !== undefined) {
      this.enterInRealChat(this.currentUser.chats[chat]);
    } else {
      this.createChat(chat);
    }
  }

  enterInRealChat(check: string) {
    this.db.selectDB('chats/' + check, ref => ref)
      .subscribe((chats: Chat[]) => {
        this.chatId = typeof chats[0] === 'string' ? chats[0] + '' : chats[1] + '';
        console.log('my chat', this.chatId);
        this.router.navigate(['/users/chat/', this.chatId]);
      });
  }

  createChat(chat: string) {
    const newPostKey = this.db.getNewId('chats');
    const postData = {
      idChat: newPostKey,
      messages: {}
    };
    this.addChatToClient(chat, this.currentUser.id, newPostKey);
    this.addChatToClient(this.currentUser.id, chat, newPostKey);

    const updates = {};
    updates['/chats/' + newPostKey] = postData;
    this.db.updateDB(updates).then(res => {
      this.router.navigate(['/users/chat', chat]);
    });
  }

  addChatToClient(id1: string, id2: string, key: string) {
    const updates2 = {};
    updates2['/users/' + id1 + '/chats/' + id2] = key;
    this.db.addNewChat(updates2);
  }

}
