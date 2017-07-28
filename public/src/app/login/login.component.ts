import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( 
    private _usersService: UsersService,
    private router: Router
   ) { }
  user = {}
  errors = []

  login(user){
    this.errors = []
    // console.log('from component to service',user);
    return this._usersService.login(user)
    .then(user => {
      // console.log('after successful login ', user)
      if (user.errors){
        
        for (let key in user.errors){
          let error = user.errors[key].message
          this.errors.push(error)
        }
      }
      else{
        this._usersService.setCurrentUser(user)
        this.router.navigateByUrl('/dashboard')
      }
      // console.log(this.errors);

    })
    .catch(err => console.log(err)
    )
  }

  ngOnInit() {
    this._usersService.logout()
  }

}
