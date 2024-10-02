import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EditButtonComponent } from '../../shared/buttons/edit-button/edit-button.component';
import { RemoveButtonComponent } from '../../shared/buttons/remove-button/remove-button.component';
import { TaskService } from './../../service/task.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-item',
  standalone: true,
  imports: [MatCheckboxModule, EditButtonComponent, RemoveButtonComponent, CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent {
  itens: { title: string; completed: boolean }[] = [];

  constructor(private taskService: TaskService) {
    this.itens = this.taskService.getItens();
  }

  removeTask(index: number) {
    this.taskService.removeItem(index);
  }

  completeTask(index: number) {
    this.taskService.completeItens(index);
  }
}
