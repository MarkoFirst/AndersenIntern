import {Component, OnInit} from '@angular/core';
import {DbService} from '../services/db/db.service';
import {ActivatedRoute} from '@angular/router';
import {Mes, MyUser} from '../interfaces/all-interfaces';
import {StoreService} from '../services/store/store.service';
import {Title} from '@angular/platform-browser';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: Mes[] = [];
  newContent = '';
  usersInChat: string;

  mi: string;

  constructor(public  db: DbService, private storeService: StoreService, public route: ActivatedRoute, private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Чат');
    this.route.paramMap.subscribe(id => {
      this.usersInChat = id.get('id');
      this.initChat();
    });
  }

  initChat() {
    this.storeService.user.subscribe((user: MyUser) => {
      this.mi = user.login;
      this.db.selectDB<Mes>('/chats/' + this.usersInChat + '/messages/', ref => {
        return ref.orderByChild('date');
      }).subscribe(messages => this.messages = messages);
      return;
    });
  }

  checkDate(mesDate: any) {
    return (new Date(mesDate).getHours() + ':' + new Date(mesDate).getMinutes());
  }

  addNewContent() {
    this.storeService.user.subscribe((user: MyUser) => {
      this.db.insertDB('/chats/' + this.usersInChat + '/messages/', {
        'text': this.newContent,
        'date': Date.now(),
        'user': user.login
      });
      this.newContent = '';
    });
  }
}
