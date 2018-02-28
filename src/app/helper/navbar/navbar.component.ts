import { LoginService } from './../../login/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: Boolean = false;

  constructor( private loginService: LoginService) {
    this.loginService.isAuthenticated.subscribe(
      data => this.isLoggedIn = data
    );
  }

  onLogout() {
    this.loginService.logout();
  }

  ngOnInit() { }

}
