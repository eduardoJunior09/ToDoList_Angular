import { Component, OnInit } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { EditButtonComponent } from "../../shared/buttons/edit-button/edit-button.component";
import { RemoveButtonComponent } from "../../shared/buttons/remove-button/remove-button.component";
import { CommonModule } from "@angular/common";
import { TaskService } from "../../service/task.service";
import { MatDialog } from "@angular/material/dialog";
import { ModalUpdateComponent } from "./../../components/modal-update/modal-update.component";
import { Task } from "./../../service/task";

@Component({
  selector: "app-item-pending",
  standalone: true,
  imports: [
    MatCheckboxModule,
    EditButtonComponent,
    RemoveButtonComponent,
    CommonModule,
    ModalUpdateComponent,
  ],
  templateUrl: "./item-pending.component.html",
  styleUrls: ["./item-pending.component.scss"],
})
export class ItemPendingComponent implements OnInit {
  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  tasks = Array<Task>();

  ngOnInit() {
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });
    this.loadCompletedTask();
  }

  loadCompletedTask() {
    this.taskService.getItens().subscribe((tasks) => {
      this.tasks = tasks.filter((item) => !item.completed);
    });
  }

  removeItem(index: number) {
    const itemId = this.tasks[index].id;
    this.taskService.removeTask(itemId).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== itemId);
    });
  }

  completeItem(index: number) {
    const item = this.tasks[index];
    const result = !this.tasks[index].completed; console.log("Lista de Tarefas:", this.tasks);
    this.taskService
      .completeTask(item.id, { completed: result })
      .subscribe((completeTask) => {
        const taskIndex = this.tasks.findIndex((t) => t.id === completeTask.id);
        if (taskIndex !== -1) {
          this.tasks[taskIndex] = completeTask;
        }
      });
     
  }

  editItem(index: number) {
    const item = this.tasks[index];
    const dialogRef = this.dialog.open(ModalUpdateComponent, {
      data: { title: item.title },
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        this.taskService
          .updateTask(item.id, { title: result })
          .subscribe((updatedTask) => {
            const taskIndex = this.tasks.findIndex(
              (t) => t.id === updatedTask.id
            );
            if (taskIndex !== -1) {
              this.tasks[taskIndex] = updatedTask;
            }
          });
      }
    });
  }
}
