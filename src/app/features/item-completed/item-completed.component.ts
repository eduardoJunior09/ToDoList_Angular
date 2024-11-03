import { Component, OnInit } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { EditButtonComponent } from "../../shared/buttons/edit-button/edit-button.component";
import { RemoveButtonComponent } from "../../shared/buttons/remove-button/remove-button.component";
import { TaskService } from "./../../service/task.service";
import { CommonModule } from "@angular/common";
import { Task } from "./../../service/task";

@Component({
  selector: "app-item-completed",
  standalone: true,
  imports: [
    MatCheckboxModule,
    EditButtonComponent,
    RemoveButtonComponent,
    CommonModule,
  ],
  templateUrl: "./item-completed.component.html",
  styleUrls: ["./item-completed.component.scss"],
})
export class ItemCompletedComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  tasks = Array<Task>();

  ngOnInit() {
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });
    this.loadCompletedTask();
  }

  loadCompletedTask() {
    this.taskService.getItens().subscribe((tasks) => {
      this.tasks = tasks.filter((item) => item.completed);
    });
  }

  completeItem(index: number) {
    const item = this.tasks[index];
    const result = !this.tasks[index].completed;
    console.log("Lista de Tarefas:", this.tasks);
    this.taskService
      .completeTask(item.id, { completed: result })
      .subscribe((completeTask) => {
        const taskIndex = this.tasks.findIndex((t) => t.id === completeTask.id);
        if (taskIndex !== -1) {
          this.tasks[taskIndex] = completeTask;
        }
      });
  }

  removeItem(index: number) {
    const itemId = this.tasks[index].id;
    this.taskService.removeTask(itemId).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== itemId);
    });
  }
}
