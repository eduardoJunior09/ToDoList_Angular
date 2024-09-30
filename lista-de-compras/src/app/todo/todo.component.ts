import { Component } from '@angular/core';
import { TaskComponent } from './../components/task/task.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [TaskComponent],

templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {

}
