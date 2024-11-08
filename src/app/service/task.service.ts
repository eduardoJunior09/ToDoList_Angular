import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  BehaviorSubject,
  Observable,
  of,
  switchMap,
  tap,
  catchError,
  map,
} from "rxjs";
import { Task } from "./task";
import { UserProfile } from "./userProfile";
import { UserSessionService } from "./UserSessionServe";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private apiUrl = "http://localhost:3000";
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(
    private http: HttpClient,
    private userSessionService: UserSessionService
  ) {
    this.loadTasks();
  }

  loadTasks() {
    this.getItens().subscribe((tasks) => {
      this.tasksSubject.next(tasks);
    });
  }

  getItens(): Observable<Task[]> {
    const userId = this.userSessionService.getUser()?.id;

    if (!userId) {
      console.error("Usuário não autenticado!");
      return new Observable<Task[]>();
    }

    return this.http
      .get<Task[]>(`${this.apiUrl}/shopping-list`)
      .pipe(
        map((tasks: Task[]) => tasks.filter((task) => task.userId === userId))
      );
  }

  addTask(task: Omit<Task, "id">): Observable<Task> {
    return this.http
      .post<Task>(`${this.apiUrl}/shopping-list`, task)
      .pipe(tap(() => this.loadTasks()));
  }

  addUser(user: UserProfile): Observable<UserProfile> {
    return this.http
      .get<UserProfile[]>(`${this.apiUrl}/users?email=${user.email}`)
      .pipe(
        switchMap((existingUsers) => {
          if (existingUsers.length > 0) {
            return of(existingUsers[0]);
          } else {
            return this.http.post<UserProfile>(`${this.apiUrl}/users`, user);
          }
        }),
        catchError((error) => {
          console.error("Erro ao verificar ou adicionar o usuário:", error);
          throw error;
        })
      );
  }

  completeTask(id: number, data: { completed: boolean }): Observable<Task> {
    return this.http
      .patch<Task>(`${this.apiUrl}/shopping-list/${id}`, data)
      .pipe(
        tap((updatedTask) => {
          const tasks = this.tasksSubject.getValue();
          const taskIndex = tasks.findIndex(
            (task) => task.id === updatedTask.id
          );
          if (taskIndex !== -1) {
            tasks[taskIndex] = updatedTask;
            this.tasksSubject.next(tasks);
          }
        })
      );
  }

  removeTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/shopping-list/${id}`).pipe(
      tap(() => {
        const tasks = this.tasksSubject.getValue();
        this.tasksSubject.next(tasks.filter((task) => task.id !== id));
      })
    );
  }

  updateTask(id: number, data: { title: string }): Observable<Task> {
    return this.http
      .patch<Task>(`${this.apiUrl}/shopping-list/${id}`, data)
      .pipe(
        tap((updatedTask) => {
          const tasks = this.tasksSubject.getValue();
          const taskIndex = tasks.findIndex(
            (task) => task.id === updatedTask.id
          );
          if (taskIndex !== -1) {
            tasks[taskIndex] = updatedTask;
            this.tasksSubject.next(tasks);
          }
        })
      );
  }
}
