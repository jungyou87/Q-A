import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { QuestionsService } from '../questions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  user = {  }
  questions :object[] = []

  constructor(
        private _usersService: UsersService,
        private router: Router,
        private _questionsService: QuestionsService
  ) { }

  isLoggedIn(){
    if (this._usersService.getCurrentUser() == null){
      this.router.navigateByUrl('/login')
      return false
    }
    else {
      return true
    }
  }

  logout(){
    this._usersService.logout()
    this.router.navigateByUrl('/login')
  }

  getCurrentUser() {
    this.user = this._usersService.getCurrentUser()
  }

  ngOnInit() {
    if(this.isLoggedIn()){
      this.getCurrentUser()
      this.getQuestions()
    }
    else{
      this.router.navigateByUrl('/login')
    }

  }
  
  getQuestions(){
    return this._questionsService.index()
    .then(questions => {
      this.questions = questions
      console.log(this.questions);
    })
    .catch(err =>  console.log(err));
  }



}
