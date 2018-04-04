import { Component, OnInit } from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  p4309027 = '&copy; 2018 S.Abidjanov All rights reserved';

  constructor( private loginService: LoginService) {}

  ngOnInit() {
    this.loginService.initAuthStatus();
  }
}
