import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserProfile } from './userProfile';

@Injectable({
  providedIn: 'root' 
})
export class UserSessionService {
  private readonly STORAGE_KEY = 'userProfile';
  private userSubject = new BehaviorSubject<UserProfile | null>(this.loadUserFromStorage());

  user$: Observable<UserProfile | null> = this.userSubject.asObservable();

  setUser(user: UserProfile): void {
    this.userSubject.next(user);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user)); 
  }

  clearUser(): void {
    this.userSubject.next(null);
    localStorage.removeItem(this.STORAGE_KEY); 
  }

  getUser(): UserProfile | null {
    return this.userSubject.value;
  }

  private loadUserFromStorage(): UserProfile | null {
    const userData = localStorage.getItem(this.STORAGE_KEY);
    return userData ? JSON.parse(userData) : null;
  }
}
