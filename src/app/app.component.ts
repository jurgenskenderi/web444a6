/*********************************************************************************
* WEB422 – Assignment 06
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or
* distributed to other students. *
* Name: Jurgen Skenderi Student ID: 157369208 Date: 2022-04-10 *
* Angular App (Deployed) Link: https://astonishing-pudding-efc364.netlify.app *
* User API (Heroku) Link: https://ancient-spire-08991.herokuapp.com/api/user
* ********************************************************************************/

import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'web422-a6';
  searchString: string = '';
  token: any = {};

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.searchString = '';
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.token = this.auth.readToken();
      }
    });
  }
  
  logout(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  handleSearch(): void {
    this.searchString = '';
  }
}
