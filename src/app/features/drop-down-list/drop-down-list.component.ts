import { Component } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { TaskService } from './../../service/task.service';
import { ItemCompletedComponent } from '../item-completed/item-completed.component';
import { ItemPendingComponent } from '../item-pending/item-pending.component';


@Component({
  selector: 'app-drop-down-list',
  standalone: true,
  imports: [MatExpansionModule, ItemCompletedComponent, ItemPendingComponent],

templateUrl: './drop-down-list.component.html',
  styleUrl: './drop-down-list.component.scss'
})
export class DropDownListComponent {
  
}
