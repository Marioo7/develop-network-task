import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/Task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() toggle = new EventEmitter<void>();
  isExpanded: boolean = false;
  globalStatusMessage: string | null = null;
  globalMessageBackgroundColor: string = '';

  constructor(private taskService: TaskService) {}
  toggleTask(task: any) {
    const newCompletionStatus = !task.completed;

    // Update the parent task's completion status
    task.completed = newCompletionStatus;

    // Update child tasks to match the parent task's completion status
    if (task.childTasks && task.childTasks.length > 0) {
      task.childTasks.forEach((childTask: any) => {
        childTask.completed = newCompletionStatus;
      });
    }

    // Call the service to update the task in the database
    this.taskService.updateTask(task.id, task).subscribe(
      (updatedTask) => {
        this.task = updatedTask;
      },
      (error) => {
        console.error('Error updating task:', error);
        this.globalStatusMessage = 'Failed to update task.';
        this.globalMessageBackgroundColor = 'lightcoral';

        // Set a timeout to clear the global status message
        setTimeout(() => {
          this.globalStatusMessage = null;
        }, 1000); // 1 seconds timeout
      }
    );
  }

  // Toggle completion status of child tasks
  toggleChildTask(task: any, childTask: any) {
    // Toggle the completion status of the child task
    childTask.completed = !childTask.completed;

    // Check if all child tasks are completed
    const allCompleted = task.childTasks.every((ct: any) => ct.completed);

    // If all child tasks are completed, update the parent task
    if (allCompleted) {
      task.completed = true;
      this.globalStatusMessage = `Task updated to completed`;
      this.globalMessageBackgroundColor = 'lightgreen';
    } else {
      task.completed = false;
      this.globalStatusMessage = `Task updated to pending`;
      this.globalMessageBackgroundColor = 'lightgreen';
    }

    // Update the parent task in the database
    this.taskService.updateTask(task.id, task).subscribe(
      (updatedTask) => {
        this.task = updatedTask;

        // Set a timeout to clear the global status message
        setTimeout(() => {
          this.globalStatusMessage = null;
        }, 3000); // 3 seconds timeout
      },
      (error) => {
        console.error('Error updating child task:', error);
        this.globalStatusMessage = 'Failed to update task.';
        this.globalMessageBackgroundColor = 'lightcoral';

        // Set a timeout to clear the global status message
        setTimeout(() => {
          this.globalStatusMessage = null;
        }, 3000); // 3 seconds timeout
      }
    );
  }
  showGlobalStatusMessage(message: string, backgroundColor: string) {
    this.globalStatusMessage = message;
    this.globalMessageBackgroundColor = backgroundColor;

    setTimeout(() => {
      this.globalStatusMessage = null;
      this.globalMessageBackgroundColor = '';
    }, 1000);
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}
