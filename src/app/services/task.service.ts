// task.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/Task';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  toggleTaskCompletion(task: Task): Observable<Task> {
    const updatedTask = { ...task, completed: !task.completed };
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, updatedTask);
  }

  toggleChildTaskCompletion(task: Task, childTask: any): Observable<Task> {
    // Toggle the completion of the child task
    childTask.completed = !childTask.completed;

    // Prepare the updated task object
    const updatedTask = { ...task };

    // Check if all child tasks are completed
    const allCompleted = updatedTask.childTasks.every((item) => item.completed);

    // If all child tasks are completed, set parent task to completed
    updatedTask.completed = allCompleted;

    // Update the parent task in the database
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, updatedTask);
  }
  updateTask(id: number, task: any): Observable<any> {
    return this.http.put(`http://localhost:3000/tasks/${id}`, task);
  }
}
