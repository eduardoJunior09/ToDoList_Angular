import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from './../../service/task.service';

@Component({
  selector: 'app-new-item',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss'],
})
export class NewItemComponent {
  newItem: string = '';
  showError: boolean = false;

  constructor(private taskService: TaskService) {}

  addItem() {
    this.validateForm();
    if (!this.showError) {
      this.taskService.addItem(this.newItem.trim());
      this.newItem = '';
    }
  }

  validateForm() {
    this.showError = this.newItem.trim().length < 2;
  }
}
