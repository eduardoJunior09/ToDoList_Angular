import { Component, OnInit } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { EditButtonComponent } from "../../shared/buttons/edit-button/edit-button.component";
import { RemoveButtonComponent } from "../../shared/buttons/remove-button/remove-button.component";
import { CommonModule } from "@angular/common";
import { TaskService } from "../../service/task.service";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
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
    MatDialogModule,
  ],
  templateUrl: "./item-pending.component.html",
  styleUrls: ["./item-pending.component.scss"],
})
export class ItemPendingComponent implements OnInit {
  dialog: any;
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


  editItem(index: number) {

    const item = this.tasks[index];
    const dialogRef = this.dialog.open(ModalUpdateComponent, {
      data: { index, title: item.title },  
    });



    dialogRef.afterClosed().subscribe((result:string) => {
      if (result) {
        this.taskService.updateTitle(item.id, result).subscribe(() => {
          item.title = result;  // Atualiza o título localmente
          this.loadCompletedTask(); 
        });
      }
    });
  }
}
