import { Component } from '@angular/core';
import { NewItemComponent } from '../components/new-item/new-item.component';
import { DropDownListComponent } from '../features/drop-down-list/drop-down-list.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [NewItemComponent, DropDownListComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {}
