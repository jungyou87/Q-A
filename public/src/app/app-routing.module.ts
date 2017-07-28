import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'

import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionComponent } from './question/question.component'
import { NewQuestionComponent} from './new-question/new-question.component'

import { NewAnswerComponent } from './new-answer/new-answer.component'

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch : 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path : 'dashboard', component: DashboardComponent 
  },
  {
    path : 'dashboard/questions/new', component: NewQuestionComponent 
  },
  {
    path : 'dashboard/questions/:id', component: QuestionComponent 
  },
  {
    path : 'dashboard/answers/:id', component: NewAnswerComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
