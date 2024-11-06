import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserProfile } from './userProfile';

@Injectable({
  providedIn: 'root' 
})
export class UserSessionService {
 
  private userSubject = new BehaviorSubject<UserProfile | null>(null);


  user$: Observable<UserProfile | null> = this.userSubject.asObservable();


  setUser(user: UserProfile): void {
    this.userSubject.next(user);
  }


  clearUser(): void {
    this.userSubject.next(null);
  }

 
  getUser(): UserProfile | null {
    return this.userSubject.value;
  }
}
