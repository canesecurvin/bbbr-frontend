import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  public loggedIn = false;


  constructor(
    public auth: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.auth.isLoggedIn)
    if (this.auth.isLoggedIn){
      this.loggedIn = true;
    }
  }

  clickMenuItem(request: string){
    if (request==='login'){
      this.router.navigate(['login']);
    } else if (request==='settings'){
      console.log('still gotta build it');
    } else if (request==='profile'){
      this.router.navigate(['profile', JSON.parse(localStorage.getItem('current_user')).id])
    } else {
      console.log('here')
      this.auth.logout();
    }
  }

}
