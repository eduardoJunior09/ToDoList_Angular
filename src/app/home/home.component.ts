
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular'; 

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(public auth: AuthService) {} // Injete o AuthService

  login(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: '/todos' // Alvo após o login
      }
    }); // Método para redirecionar para o login
  }
}
