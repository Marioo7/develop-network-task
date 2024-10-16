# develop-network-task

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.3.

# Task Management Application

This is a Task Management Application built with Angular, designed to manage tasks and their subtasks (child tasks). The application allows users to toggle the completion status of tasks and child tasks, view task details, and filter tasks based on their completion status (all, completed, or pending).

## Features

- **Task Management:** Display tasks and their child tasks in a structured table format.
- **Task Status Toggle:** Users can toggle between "completed" and "pending" states for tasks and child tasks using a checkbox.
- **Task Expansion:** Tasks can be expanded to show the list of associated child tasks.
- **Status Messages:** Display global status messages when a task is updated or an error occurs.
- **Task Filtering:** Users can filter tasks by all, completed, or pending status.
- **Data Persistence:** Changes are persisted to a backend service using HTTP requests.

## Project Structure

### Components

1. **TaskItemComponent:** Responsible for displaying individual tasks, handling task status toggling, and managing child task updates.
2. **TaskListComponent:** Displays a list of tasks with filtering options, retrieves tasks from the service, and passes them to `TaskItemComponent`.

### Services

- **TaskService:** Provides methods to interact with the backend API for fetching, updating, and managing tasks and child tasks.

### Models

- **Task:** The main task model, containing properties like `id`, `title`, `completed`, and an array of `childTasks`.
- **ChildTask:** Represents a child task, with properties `name` and `completed`.

## Technologies Used

- **Angular:** Framework for building the frontend.
- **Bootstrap:** CSS framework used for styling the tables, buttons, and forms.
- **RxJS:** For managing asynchronous data flow using Observables.
- **JSON Server (or API):** Simulating a backend to persist task data.

## Getting Started

### Prerequisites

- Node.js and npm installed on your system.

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Marioo7/develop-network-task.git
   ```
   Then open project in vs code and open terminal.
   
3. Install dependencies:
   ```
   npm install
   ```
4. Set up a JSON server for the backend (if using JSON Server):
   ```
   npm install -g json-server
   json-server --watch db.json
   ```
   
5. Start the development server:
   ```
   ng serve
   ```



### Running the Application

- Access the app in your browser at `http://localhost:4200`.
- JSON server runs at `http://localhost:3000/tasks` and stores task data.

## Usage

1. **View Tasks:** Tasks are displayed in a table format. Child tasks can be viewed by expanding the main task.
2. **Toggle Task Status:** Checkboxes are available for toggling the status of tasks and child tasks.
3. **Global Status Messages:** A message will appear at the top of the page to inform users if a task was updated successfully or if an error occurred.

## Task Filtering

- The task list can be filtered using the dropdown menu:
  - **All Tasks:** Displays all tasks.
  - **Completed Tasks:** Displays only tasks marked as completed.
  - **Pending Tasks:** Displays only tasks marked as pending.

## API Endpoints

- **GET Tasks:** `GET http://localhost:3000/tasks`
- **PUT Task:** `PUT http://localhost:3000/tasks/{id}`

## JSON Structure (db.json)

```
{
  "tasks": [
    {
      "id": "1",
      "title": "Task A",
      "completed": true,
      "childTasks": [
        { "name": "Item 1", "completed": true },
        { "name": "Item 2", "completed": true },
        { "name": "Item 3", "completed": true }
      ]
    },
    {
      "id": "2",
      "title": "Task B",
      "completed": false,
      "childTasks": [
        { "name": "Item 11", "completed": false },
        { "name": "Item 12", "completed": false },
        { "name": "Item 13", "completed": false }
      ]
    },
    {
      "id": "3",
      "title": "Task C",
      "completed": false,
      "childTasks": [
        { "name": "Item 21", "completed": false },
        { "name": "Item 22", "completed": false },
        { "name": "Item 23", "completed": false }
      ]
    }
  ]
}
```

## Contributers

Mario Fathy
