import { Story } from '../models/story';
import { Priority } from '../enums/priority';
import { Status } from '../enums/status';
import { UserApiHelper } from '../helpers/userApiHelper';
import { ProjectsApiHelper } from '../helpers/projectApiHelper';

class StoryForm {
  public form: HTMLFormElement;
  private nameInput: HTMLInputElement;
  private descriptionInput: HTMLInputElement;
  private prioritySelect: HTMLSelectElement;
  private ownerSelect: HTMLSelectElement;
  private usersApiHelper: UserApiHelper;
  private projectApiHelper: ProjectsApiHelper;

  constructor(idName: string) {
    this.form = document.createElement('form');
    this.form.className = 'form-component';
    this.form.id = idName;

    this.nameInput = document.createElement('input');
    this.nameInput.type = 'text';
    this.nameInput.placeholder = 'Enter story name';
    this.nameInput.name = 'storyName';

    this.descriptionInput = document.createElement('input');
    this.descriptionInput.type = 'text';
    this.descriptionInput.placeholder = 'Enter story description';
    this.descriptionInput.name = 'storyDescription';

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

    this.usersApiHelper = new UserApiHelper();
    this.projectApiHelper = new ProjectsApiHelper();
    this.populateOwnerSelect();

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';

    this.form.appendChild(this.nameInput);
    this.form.appendChild(this.descriptionInput);
    this.form.appendChild(this.prioritySelect);
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
    onSubmitHandler: (event: Event, story: Story) => void
  ): void {
    this.form.onsubmit = (event: Event) => {
      event.preventDefault();
      const story = new Story(
        this.nameInput.value,
        this.descriptionInput.value,
        Priority[this.prioritySelect.value as keyof typeof Priority],
        Status.ToDo,
        this.projectApiHelper.getActiveProject()?.uuid ?? '',
        this.ownerSelect.value
      );
      this.clearForm();
      onSubmitHandler(event, story);
    };
  }

  public setStoryData(story: Story): void {
    this.nameInput.value = story.name;
    this.descriptionInput.value = story.description;
    this.prioritySelect.value = Priority[story.priority];
    this.ownerSelect.value = story.ownerUuid;
  }

  private clearForm(): void {
    this.nameInput.value = '';
    this.descriptionInput.value = '';
    this.prioritySelect.value = '';
    this.ownerSelect.value = '';
  }
}

export default StoryForm;
