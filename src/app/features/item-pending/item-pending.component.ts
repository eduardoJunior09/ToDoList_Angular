import { Component } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { EditButtonComponent } from "../../shared/buttons/edit-button/edit-button.component";
import { RemoveButtonComponent } from "../../shared/buttons/remove-button/remove-button.component";
import { CommonModule } from "@angular/common";
import { TaskService } from "../../service/task.service";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { ModalUpdateComponent } from "./../../components/modal-update/modal-update.component";

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
export class ItemPendingComponent {
  itensPendentes: { title: string; completed: boolean }[] = [];

  constructor(private taskService: TaskService, private dialog: MatDialog) {
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

  editItem(index: number) {
    const dialogRef = this.dialog.open(ModalUpdateComponent, {
      data: { index, title: this.itensPendentes[index].title },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.updatetitle(index, result);
        this.updateItems();
      }
    });
  }
}
