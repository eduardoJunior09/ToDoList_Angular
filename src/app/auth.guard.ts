import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.isAuthenticated$.pipe(
      tap((isAuthenticated: boolean) => { // Definindo explicitamente o tipo
        if (!isAuthenticated) {
          this.router.navigate(['/']); // Redireciona para a página inicial se não estiver autenticado
        }
      })
    );
  }
}
