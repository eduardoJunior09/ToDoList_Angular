import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router'; // Adicione o Router aqui
import { TodoComponent } from './todo/todo.component';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoComponent, CommonModule, HomeComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lista-de-compras';

  constructor(public auth: AuthService, private router: Router) { // Verifique a injeção do Router aqui
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      console.log('User authenticated:', isAuthenticated);
    });

    // Redirecionar com base no appState após a autenticação
    this.auth.appState$.subscribe(appState => {
      if (appState && appState.target) {
        this.router.navigate([appState.target]);
      }
    });
  }
}
