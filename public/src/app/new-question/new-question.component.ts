import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { QuestionsService } from '../questions.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent implements OnInit {

  constructor(
        private _usersService: UsersService,
        private router: Router,
        private _questionsService: QuestionsService
  ) { }

  user = {}
  question = {}
  errors= []

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
    }
    else{
      this.router.navigateByUrl('/login')
    }

  }
  createQuestion(question){
    console.log(question);
    this._questionsService.create(question)
    .then(question => {
      this.errors = []
      if (question.errors){
        for (let key in question.errors){
          let error = question.errors[key].message
          this.errors.push(error)
        }
      }
      else{
        this.router.navigateByUrl('/dashboard')
      }
    })
    .catch(err => console.log(err))
    
  }


}
