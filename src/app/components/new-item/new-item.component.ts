import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TaskService } from "./../../service/task.service";
import { Task } from "./../../service/task";

@Component({
  selector: "app-new-item",
  standalone: true,
  imports: [FormsModule, CommonModule], // Imports de módulos necessários
  templateUrl: "./new-item.component.html",
  styleUrls: ["./new-item.component.scss"],
})
export class NewItemComponent {
  constructor(private taskService: TaskService) {}

  newItem: string = "";
  showError: boolean = false;
  tasks: Task[] = [];

  addItem() {
    this.validateForm();

    if (!this.showError) {
      const taskToAdd: Omit<Task, "id"> = { title: this.newItem.trim(), completed: false };

      this.taskService.addTask(taskToAdd).subscribe({
        next: (task: Task) => {
          this.tasks.push(task);
          this.newItem = "";
          console.log("Lista de Tarefas:", this.tasks);
        },
        error: (err) => {
          console.error("Erro ao adicionar a tarefa:", err);
        },
      });
    }
  }

  validateForm() {
    this.showError = this.newItem.trim().length < 2;
  }
}
