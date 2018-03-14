import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {Login} from '../interfaces/all-interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  newUserForm: FormGroup;

  constructor(public authService: AuthService, private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Вход');

    this.newUserForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  onSubmit({login, email, password}: Login): void {
    if (login) {
      this.authService.signup(email, password, login);
      return;
    }
    this.authService.login(email, password);
  }

  signup(): void {
    this.newUserForm.addControl('newLogin', new FormControl('', Validators.required));
  }
}
