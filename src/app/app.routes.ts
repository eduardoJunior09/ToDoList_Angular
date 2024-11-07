import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoComponent } from './todo/todo.component';
import { AuthGuard } from './auth.guard'; 
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'todos', component: TodoComponent, canActivate: [AuthGuard] }, 
  { path: '**', component: PageNotFoundComponent },
];
