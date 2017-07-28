import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { QuestionsService } from '../questions.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AnswersService } from '../answers.service'

@Component({
  selector: 'app-new-answer',
  templateUrl: './new-answer.component.html',
  styleUrls: ['./new-answer.component.css']
})
export class NewAnswerComponent implements OnInit {
  id = ''
  user = {
    _id: ''
  }
  question = {  }
  errors= []
  answer = {
    _user : '',
    _question : ''
  }


  constructor(
        private _usersService: UsersService,
        private router: Router,
        private _route: ActivatedRoute,
        private _questionsService: QuestionsService,
        private _answersService: AnswersService
  ) {
    this._route.params.subscribe(param => this.id = param.id)
  }
  
  isLoggedIn(){
    if (this._usersService.getCurrentUser() == null){
      this.router.navigateByUrl('/login')
      return false
    }
    else {
      return true
    }
  }
  showQuestion(id){
    return this._questionsService.show(id)
    .then(question => {
      this.question = question
    })
    .catch(err => console.log(err))
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
      this.showQuestion(this.id)
    }
    else{
      this.router.navigateByUrl('/login')
    }

  }
  createAnswer(answer){
    this.answer._user = this.user._id
    this.answer._question = this.id
    return this._answersService.create(answer)
    .then(answer => {
      this.errors = []
      if (answer.errors){
        for (let key in answer.errors){
          let error = answer.errors[key].message
          this.errors.push(error)
        }
      } else {
        this.router.navigateByUrl('/dashboard')
      }
    })
    .catch(err => console.log(err)
    )
  }
  
}
