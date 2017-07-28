import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs'

@Injectable()
export class UsersService {

  constructor(private _http: Http) { }

  
  login(user){
    // console.log('from service : ',user);
    return this._http.post('/login', user).map(data => data.json()).toPromise()
  }

  setCurrentUser(user){
    localStorage.setItem('CurrentUser', JSON.stringify(user));
  }

  getCurrentUser(){
    return JSON.parse(localStorage.getItem('CurrentUser'));
  }

  logout(){
    localStorage.removeItem('CurrentUser');
    
  }
}
