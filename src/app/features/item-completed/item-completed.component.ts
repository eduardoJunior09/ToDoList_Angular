import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EditButtonComponent } from '../../shared/buttons/edit-button/edit-button.component';
import { RemoveButtonComponent } from '../../shared/buttons/remove-button/remove-button.component';
import { TaskService } from './../../service/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-completed',
  standalone: true,
  imports: [
    MatCheckboxModule,
    EditButtonComponent,
    RemoveButtonComponent,
    CommonModule,
  ],
  templateUrl: './item-completed.component.html',
  styleUrl: './item-completed.component.scss',
})
export class ItemCompletedComponent {
  itensConcluidos: { title: string; completed: boolean }[] = [];

  constructor(private taskService: TaskService) {
    this.itensConcluidos = this.taskService.getItens();
  }

  removeItem(index: number) {
    this.taskService.removeItem(index);
    this.updateItems();
  }

  completeItem(index: number) {
    this.taskService.completeItens(index);
    this.updateItems();
  }

  updateItems() {
    this.itensConcluidos = this.taskService.getItens();
  }
}
