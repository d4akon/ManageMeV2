import { Task } from '../models/task';
import { Priority } from '../enums/priority';
import { Status } from '../enums/status';
import { UserApiHelper } from '../helpers/userApiHelper';
import { ProjectsApiHelper } from '../helpers/projectApiHelper';

class TaskForm {
  public form: HTMLFormElement;
  private nameInput: HTMLInputElement;
  private descriptionInput: HTMLInputElement;
  private prioritySelect: HTMLSelectElement;
  private statusSelect: HTMLSelectElement;
  private ownerSelect: HTMLSelectElement;
  private usersApiHelper: UserApiHelper;
  private projectApiHelper: ProjectsApiHelper;

  constructor(idName: string, storyUuid: string) {
    this.form = document.createElement('form');
    this.form.className = 'form-component';
    this.form.id = idName;

    this.nameInput = document.createElement('input');
    this.nameInput.type = 'text';
    this.nameInput.placeholder = 'Enter task name';
    this.nameInput.name = 'taskName';

    this.descriptionInput = document.createElement('input');
    this.descriptionInput.type = 'text';
    this.descriptionInput.placeholder = 'Enter task description';
    this.descriptionInput.name = 'taskDescription';

    this.prioritySelect = document.createElement('select');
    this.prioritySelect.name = 'priority';
    Object.keys(Priority)
      .filter((key) => isNaN(Number(key)))
      .forEach((key) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        this.prioritySelect.appendChild(option);
      });

    this.statusSelect = document.createElement('select');
    this.statusSelect.name = 'status';
    Object.keys(Status)
      .filter((key) => isNaN(Number(key)))
      .forEach((key) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        this.statusSelect.appendChild(option);
      });

    this.ownerSelect = document.createElement('select');
    this.ownerSelect.name = 'ownerUuid';

    this.usersApiHelper = new UserApiHelper();
    this.projectApiHelper = new ProjectsApiHelper();
    this.populateOwnerSelect();

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';

    this.form.appendChild(this.nameInput);
    this.form.appendChild(this.descriptionInput);
    this.form.appendChild(this.prioritySelect);
    this.form.appendChild(this.statusSelect);
    this.form.appendChild(this.ownerSelect);
    this.form.appendChild(submitButton);
  }

  private populateOwnerSelect(): void {
    const users = this.usersApiHelper.getAll();
    users.forEach((user) => {
      const option = document.createElement('option');
      option.value = user.uuid;
      option.textContent = `${user.name} ${user.surname}`;
      this.ownerSelect.appendChild(option);
    });
  }

  public setOnSubmit(
    onSubmitHandler: (event: Event, task: Task) => void
  ): void {
    this.form.onsubmit = (event: Event) => {
      event.preventDefault();
      const task = new Task(
        this.nameInput.value,
        this.descriptionInput.value,
        Priority[this.prioritySelect.value as keyof typeof Priority],
        'TEST STORY',
        Status.Doing,
        new Date(),
        null,
        this.ownerSelect.value
      );
      this.clearForm();
      onSubmitHandler(event, task);
    };
  }

  public setTaskData(task: Task): void {
    this.nameInput.value = task.name;
    this.descriptionInput.value = task.description;
    this.prioritySelect.value = Priority[task.priority];
    this.statusSelect.value = Status[task.status];
    this.ownerSelect.value = task.assignedUserUuid;
  }

  private clearForm(): void {
    this.nameInput.value = '';
    this.descriptionInput.value = '';
    this.prioritySelect.value = '';
    this.statusSelect.value = '';
    this.ownerSelect.value = '';
  }
}

export default TaskForm;
