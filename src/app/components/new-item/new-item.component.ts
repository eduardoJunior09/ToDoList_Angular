import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TaskService } from "./../../service/task.service";
import { Task } from "./../../service/task";
import { UserSessionService } from '../../service/UserSessionServe';

@Component({
  selector: "app-new-item",
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: "./new-item.component.html",
  styleUrls: ["./new-item.component.scss"],
})
export class NewItemComponent {
  constructor(private taskService: TaskService, private userSessionService: UserSessionService) {}

  newItem: string = "";
  showError: boolean = false;
  tasks: Task[] = [];
  userNotAuthenticated: boolean = false; 

  addItem() {
    const userId = this.userSessionService.getUser()?.id;

    if (!userId) {
      this.userNotAuthenticated = true; 
      console.error('Usuário não autenticado!');
      return;
    }

    this.userNotAuthenticated = false; 

    this.validateForm();

    if (!this.showError) {
      const taskToAdd: Omit<Task, "id"> = {
        title: this.newItem.trim(),
        completed: false,
        userId: userId,
      };

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
