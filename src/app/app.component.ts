import { AuthService } from './auth.service';
import { MusicDataService } from './music-data.service';
/*********************************************************************************
* WEB422 – Assignment 06
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or
* distributed to other students.
*
* Name: Juyoung Park    Student ID: 150155182     Date: 12/1/2021
* Angular App (Deployed) Link: https://unruffled-leakey-788e3f.netlify.app
*
* User API (Heroku) Link: https://intense-garden-14479.herokuapp.com/
*
********************************************************************************/
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private musicData: MusicDataService, private auth: AuthService) { }

  token :any;
  title = 'my-app';
  searchString: string = "";

  handleSearch(): void {
    this.router.navigate(['/search'], { queryParams: { q: this.searchString } });
    this.searchString = "";
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.router.events.subscribe((event:any ) => {
      if (event instanceof NavigationStart) { // only read the token on "NavigationStart"
        this.token = this.auth.readToken();
      }
    });
  }


}
