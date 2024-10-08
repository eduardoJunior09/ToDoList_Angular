import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
@Component({
  selector: "app-modal-update",
  standalone: true,
  imports: [MatButtonModule, FormsModule, CommonModule, MatDialogModule],
  templateUrl: "./modal-update.component.html",
  styleUrl: "./modal-update.component.scss",
})
export class ModalUpdateComponent {
  newTitle: string;

  constructor(
    public dialogRef: MatDialogRef<ModalUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { index: number; title: string }
  ) {
    this.newTitle = data.title;
  }

  onSave() {
    this.dialogRef.close(this.newTitle);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
