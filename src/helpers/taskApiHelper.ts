import { Task } from '../models/task';
import { IApiHelper } from './iApiHelper';

export class TaskApiHelper implements IApiHelper<Task> {
  private readonly STORAGE_KEY = 'Tasks';

  private getTasksFromLocalStorage(): Task[] {
    const tasksJSON = localStorage.getItem(this.STORAGE_KEY);
    if (tasksJSON) {
      try {
        return JSON.parse(tasksJSON);
      } catch (error) {
        console.error('Error parsing tasks from local storage:', error);
        return [];
      }
    } else {
      return [];
    }
  }

  get(uuid: string): Task | undefined {
    const tasks: Task[] = this.getTasksFromLocalStorage();
    return tasks.find((x) => x.uuid == uuid);
  }

  getAll(): Task[] {
    return this.getTasksFromLocalStorage();
  }

  create(data: Task) {
    const tasks: Task[] = this.getTasksFromLocalStorage();
    tasks.push(data);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
  }

  update(data: Task) {
    const tasks: Task[] = this.getTasksFromLocalStorage();
    const index = tasks.findIndex((x) => x.uuid == data.uuid);
    if (index !== -1) {
      tasks[index] = data;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    } else {
      console.error('Task not found for update:', data.uuid);
    }
  }

  delete(uuid: string): void {
    const tasks: Task[] = this.getTasksFromLocalStorage();
    const index = tasks.findIndex((x) => x.uuid == uuid);
    if (index !== -1) {
      tasks.splice(index, 1);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    } else {
      console.error('Task not found for deletion:', uuid);
    }
  }

  getAllByStoryUuid(uuid: string | null): Task[] {
    const tasks: Task[] = this.getTasksFromLocalStorage();
    return tasks.filter((task) => task.storyUuid == uuid);
  }
}
