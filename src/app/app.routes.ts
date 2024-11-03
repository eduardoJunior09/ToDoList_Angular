import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoComponent } from './todo/todo.component';
import { AuthGuard } from './auth.guard'; 

export const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'todos', component: TodoComponent, canActivate: [AuthGuard] }, 
];
