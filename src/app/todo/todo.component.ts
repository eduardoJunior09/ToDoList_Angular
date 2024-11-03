import { Component, OnInit } from "@angular/core";
import { NewItemComponent } from "../components/new-item/new-item.component";
import { DropDownListComponent } from "../features/drop-down-list/drop-down-list.component";
import { AuthService } from "@auth0/auth0-angular";
import { User } from "@auth0/auth0-angular";

@Component({
  selector: "app-todo",
  standalone: true,
  imports: [NewItemComponent, DropDownListComponent],
  templateUrl: "./todo.component.html",
  styleUrl: "./todo.component.scss",
})
export class TodoComponent implements OnInit {
  profile?: User | undefined | null;
  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((profile) => {
      this.profile = profile;
    });
  }
}
