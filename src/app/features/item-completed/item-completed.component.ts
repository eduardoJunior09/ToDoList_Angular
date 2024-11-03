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
    this.loadCompletedTask();
  }

  loadCompletedTask() {
    this.taskService.getItens().subscribe((tasks) => {
      this.tasks = tasks.filter((item) => item.completed);
    });
  }

  completeItem(index: number) {
    const item = this.tasks[index];
    const updatedStatus = !item.completed;

    this.taskService.completeItens(item.id).subscribe(() => {
      item.completed = updatedStatus;
    });
    if (!updatedStatus) {
      this.loadCompletedTask();
    }
  }

  removeItem(index: number) {
    const itemId = this.tasks[index].id;
    this.taskService.removeItem(itemId).subscribe(() => {
      this.loadCompletedTask();
    });
  }
}
