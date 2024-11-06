// home.component.ts
import { Component, OnInit } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { TaskService } from "../service/task.service";
import { UserProfile } from "../service/userProfile";
import { UserSessionService } from "./../service/UserSessionServe";

@Component({
  selector: "app-home",
  standalone: true,
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  user: UserProfile | null = null;

  constructor(
    public auth: AuthService,
    private taskService: TaskService,
    private userSessionService: UserSessionService
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((userProfile) => {
      if (userProfile) {
        this.user = userProfile;
        this.addUser(userProfile);
      }
    });
  }

  login(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: "/todos",
      },
    });
  }

  private addUser(userProfile: any): void {
    const newUser: Omit<UserProfile, 'id'> = {
      name: userProfile.name || "", 
      email: userProfile.email || "",
    };
    this.taskService.addUser(newUser).subscribe((user) => {
      if (user['id']) {
        this.userSessionService.setUser(user); 
        console.log("Usuário armazenado no Singleton:", this.userSessionService.getUser());
        this.taskService.loadTasks();
      }
    });
  }
}
