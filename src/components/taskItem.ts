import { TaskApiHelper } from '../helpers/taskApiHelper';
import { Task } from '../models/task';
import Modal from './modal';
import TaskForm from './taskForm';

class TaskItem {
  private element: HTMLElement;
  private taskApiHelper: TaskApiHelper;
  private modal: Modal;

  constructor(parentId: string, task: Task) {
    this.taskApiHelper = new TaskApiHelper();
    this.modal = new Modal('edit-task-modal', 'content-container');

    this.element = document.createElement('div');
    this.element.className = 'task-item';

    const title = document.createElement('h2');
    title.className = 'task-item-title';
    title.textContent = task.name;

    const desc = document.createElement('p');
    desc.className = 'task-item-desc';
    desc.textContent = task.description;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'task-item-delete';
    deleteButton.textContent = 'x';
    deleteButton.onclick = () => this.deleteTask(task);

    const editButton = document.createElement('button');
    editButton.className = 'task-item-edit';
    editButton.textContent = 'Edit';
    editButton.onclick = () => this.openEditModal(task);

    this.element.appendChild(deleteButton);
    this.element.appendChild(title);
    this.element.appendChild(desc);
    this.element.appendChild(editButton);

    const parent: HTMLElement | null = document.getElementById(parentId);
    if (parent) {
      parent.appendChild(this.element);
    } else {
      console.error(`Parent element with id "${parentId}" not found`);
    }
  }

  private deleteTask(task: Task): void {
    this.taskApiHelper.delete(task.uuid);
    this.element.remove();
  }

  private openEditModal(task: Task): void {
    const editForm = new TaskForm('edit-task-form', task.storyUuid);
    editForm.setTaskData(task);

    editForm.setOnSubmit((event: Event, updatedTask: Task) => {
      updatedTask.uuid = task.uuid;
      this.taskApiHelper.update(updatedTask);
      this.modal.close();
      location.reload();
    });

    this.modal.setContent(editForm.form);
    this.modal.open();
  }
}

export default TaskItem;
