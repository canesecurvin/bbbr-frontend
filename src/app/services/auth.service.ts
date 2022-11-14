import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtResponse, ROLES } from '../graphql/types/user';


@Injectable()
export class AuthService {
  public currentUser;
  constructor(
    public router: Router
  ) {}

  setCurrentUser<UserResponse>(user){
    console.log(user);
    let jwt: JwtResponse = user.jwtResponse;
    localStorage.setItem('access_token', jwt.jwtToken);
    console.log(localStorage.getItem('access_token'))
    this.currentUser = {id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, roles: user.roles}
    localStorage.setItem('current_user', JSON.stringify(this.currentUser));
    console.log(this.currentUser);
    this.router.navigate(['home'])
  }

  getToken(){
    console.log(localStorage.getItem('access_token'));
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean{
    let authToken = localStorage.getItem('access_token');
    console.log(authToken!==null?true:false)
    return authToken!==null?true:false;
  }

  logout(){
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null){
      this.currentUser = null;
      location.reload()
      this.router.navigate(['home'])
    }
  }
}