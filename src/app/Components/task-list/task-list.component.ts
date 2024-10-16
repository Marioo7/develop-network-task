import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../models/Task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filter: string = 'all'; // Filter type: 'all', 'completed', 'pending'

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  toggleCompletion(task: Task): void {
    this.taskService.toggleTaskCompletion(task).subscribe((updatedTask) => {
      task.completed = updatedTask.completed;
    });
  }

  filteredTasks(): Task[] {
    if (this.filter === 'completed') {
      return this.tasks.filter((task) => task.completed);
    } else if (this.filter === 'pending') {
      return this.tasks.filter((task) => !task.completed);
    }
    return this.tasks;
  }
}
