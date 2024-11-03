import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators'; // Adicione o 'map' aqui

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.isAuthenticated$.pipe(
      tap((isAuthenticated: boolean) => {
        if (!isAuthenticated) {
          this.router.navigate(['/']); // Redireciona para a página inicial se não estiver autenticado
        }
      }),
      map((isAuthenticated: boolean) => isAuthenticated) // Retorna o valor booleano
    );
  }
}
