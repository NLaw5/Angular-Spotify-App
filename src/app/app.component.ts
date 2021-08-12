/*********************************************************************************
* WEB422 – Assignment 05
I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
No part of this assignment has been copied manually or electronically from any other source 
(including web sites) or distributed to other students.
*
* Name: Newman Law Student ID: 134543198 Date: July 30, 2021
*
********************************************************************************/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';  
import { Event, NavigationStart } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'web422-a4';
  searchString: string | undefined;
  public token: any;
  constructor (private router: Router, private auth:AuthService) {
  }

  handleSearch()
  {
    console.log("Testing string: ")
    console.log(this.searchString) 
    //Implement this so that we refresh search component but not the actual whole page!!!
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/search'], {queryParams: {q: this.searchString}});
      this.searchString = "";
    }); 
  }

  logout()
  {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  ngOnInit(){ 
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) { // only read the token on "NavigationStart"
        this.token = this.auth.readToken();
      }
    });
  }
}
