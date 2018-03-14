import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  newLogin: string;
  email: string;
  password: string;

  newUserForm: FormGroup;
  newLoginForm = new FormControl();

  constructor(public authService: AuthService, private fb: FormBuilder, private titleService: Title) {
    this.createForm();
  }

  createForm() {
    this.newUserForm = this.fb.group({
      newLoginForm: ['', Validators.required ]
    });
  }

  ngOnInit() {
    this.titleService.setTitle('Вход');
  }

  signup() {
    if (this.newLogin && this.email && this.password) {
      this.authService.signup(this.email, this.password, this.newLogin);
      this.email = this.password = '';
    }
  }

  login() {
    this.authService.login(this.email, this.password);
    this.email = this.password = '';
  }

  logout() {
    this.authService.logout();
  }

}
