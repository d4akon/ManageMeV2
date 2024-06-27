import { Task } from '../models/task';
import { Priority } from '../enums/priority';
import { Status } from '../enums/status';
import { UserApiHelper } from '../helpers/userApiHelper';
import { ProjectsApiHelper } from '../helpers/projectApiHelper';
import { Role } from '../enums/role';

class TaskForm {
  public form: HTMLFormElement;
  private nameInput: HTMLInputElement;
  private descriptionInput: HTMLInputElement;
  private hoursToCompleteInput: HTMLInputElement;
  private prioritySelect: HTMLSelectElement;
  private ownerSelect: HTMLSelectElement;
  private usersApiHelper: UserApiHelper;
  private projectApiHelper: ProjectsApiHelper;
  private storyUuid: string | null;

  constructor(idName: string, storyUuid: string | null) {
    this.form = document.createElement('form');
    this.form.className = 'form-component';
    this.form.id = idName;

    this.storyUuid = storyUuid;

    this.nameInput = document.createElement('input');
    this.nameInput.type = 'text';
    this.nameInput.placeholder = 'Enter task name';
    this.nameInput.name = 'taskName';

    this.descriptionInput = document.createElement('input');
    this.descriptionInput.type = 'text';
    this.descriptionInput.placeholder = 'Enter task description';
    this.descriptionInput.name = 'taskDescription';

    this.hoursToCompleteInput = document.createElement('input');
    this.hoursToCompleteInput.type = 'text';
    this.hoursToCompleteInput.placeholder = 'Enter expected hours to complete';
    this.hoursToCompleteInput.name = 'taskHoursToComplete';

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

    this.ownerSelect = document.createElement('select');
    this.ownerSelect.name = 'ownerUuid';
    this.ownerSelect.value = '';
    this.ownerSelect.style.visibility = 'hidden';

    this.usersApiHelper = new UserApiHelper();
    this.projectApiHelper = new ProjectsApiHelper();

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';

    this.form.appendChild(this.nameInput);
    this.form.appendChild(this.descriptionInput);
    this.form.appendChild(this.hoursToCompleteInput);
    this.form.appendChild(this.prioritySelect);
    this.form.appendChild(this.ownerSelect);
    this.form.appendChild(submitButton);
  }

  private async populateOwnerSelect() {
    let users = await this.usersApiHelper.getAll();
    users = users.filter(
      (x) => x.role === Role.Developer || x.role === Role.Devops
    );
    users.forEach((user) => {
      const option = document.createElement('option');
      option.value = user.uuid;
      option.textContent = `${user.name} ${user.surname} - ${Role[user.role]}`;
      this.ownerSelect.appendChild(option);
    });
  }

  public setOnSubmit(
    onSubmitHandler: (event: Event, task: Task) => void
  ): void {
    this.form.onsubmit = (event: Event) => {
      event.preventDefault();
      const task = new Task(
        crypto.randomUUID(),
        this.nameInput.value,
        this.descriptionInput.value,
        Number(this.hoursToCompleteInput.value),
        Priority[this.prioritySelect.value as keyof typeof Priority],
        this.storyUuid,
        Status.ToDo,
        new Date(),
        null,
        null,
        null
      );
      if (this.ownerSelect.value) {
        task.assignedUserUuid = this.ownerSelect.value;
        task.status = Status.Doing;
        task.dateOfStart = new Date();
      }
      this.clearForm();
      onSubmitHandler(event, task);
    };
  }

  public setTaskData(task: Task): void {
    this.populateOwnerSelect();
    this.nameInput.value = task.name;
    this.descriptionInput.value = task.description;
    this.hoursToCompleteInput.value = task.hoursToComplete.toString();
    this.prioritySelect.value = Priority[task.priority];
    this.ownerSelect.value = task.assignedUserUuid ?? '';
    this.ownerSelect.style.visibility = 'visible';
  }

  private clearForm(): void {
    this.nameInput.value = '';
    this.descriptionInput.value = '';
    this.hoursToCompleteInput.value = '';
    this.prioritySelect.value = '';
    this.ownerSelect.value = '';
  }
}

export default TaskForm;
