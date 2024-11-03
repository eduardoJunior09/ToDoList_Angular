import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Task } from "./task";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private apiUrl = "http://localhost:3000/shopping-list"; // Definindo o endpoint base

  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadTasks();
  }

 
  loadTasks() {
    this.getItens().subscribe((tasks) => {
      this.tasksSubject.next(tasks); 
    });
  }

  getItens(): Observable<Array<Task>> {
    return this.http.get<Array<Task>>(this.apiUrl);
  }

  addTask(task: Omit<Task, "id">): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      tap(() => this.loadTasks()) 
    );
  }


  completeTask(id: number, task: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, task).pipe(
      tap(() => this.loadTasks()) 
    );
  }

  removeTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadTasks()) 
    );
  }

  updateTask(id: number, task: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, task).pipe(
      tap(() => this.loadTasks()) 
    );
  }
}
