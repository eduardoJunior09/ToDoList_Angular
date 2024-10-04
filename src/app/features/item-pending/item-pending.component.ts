import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EditButtonComponent } from '../../shared/buttons/edit-button/edit-button.component';
import { RemoveButtonComponent } from '../../shared/buttons/remove-button/remove-button.component';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-item-pending',
  standalone: true,
  imports: [
    MatCheckboxModule,
    EditButtonComponent,
    RemoveButtonComponent,
    CommonModule,
  ],
  templateUrl: './item-pending.component.html',
  styleUrl: './item-pending.component.scss',
})
export class ItemPendingComponent {
  itensPendentes: { title: string; completed: boolean }[] = [];

  constructor(private taskService: TaskService) {
    this.itensPendentes = this.taskService.getItens();
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
    this.itensPendentes = this.taskService.getItens();
  }
}
