import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { QuestionsService } from '../questions.service';
import { AnswersService} from '../answers.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  user = {  }
  question = {
    answers : []
   }
  id = ''
  

  constructor(
        private _usersService: UsersService,
        private router: Router,
        private _route: ActivatedRoute,
        private _questionsService: QuestionsService,
        private _answersService : AnswersService
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

  showQuestion(id){
    return this._questionsService.show(id)
    .then(question => {
      this.question = question
    })
    .catch(err => console.log(err))

  }

  increaseLikes(id, idx){
    return this._answersService.increaseLikes(id)
    .then(answer => {
      console.log(answer);
      this.question.answers[idx].likes++;
    })
    .catch(err => console.log(err))
    
  }
}
