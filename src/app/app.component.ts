import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common'; // Importe o CommonModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoComponent, CommonModule], // Adicione CommonModule aqui
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lista-de-compras';

  constructor(public auth: AuthService) {}

}
