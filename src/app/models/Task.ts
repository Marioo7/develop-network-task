export interface ChildTask {
  name: string;
  completed: boolean;
}

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  childTasks: ChildTask[];
}
