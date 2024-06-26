import { Story } from '../models/story';
import { Priority } from '../enums/priority';
import { Status } from '../enums/status';
import { UserApiHelper } from '../helpers/userApiHelper';
import { ProjectsApiHelper } from '../helpers/projectApiHelper';
import { Role } from '../enums/role';

class StoryForm {
  public form: HTMLFormElement;
  private nameInput: HTMLInputElement;
  private descriptionInput: HTMLInputElement;
  private prioritySelect: HTMLSelectElement;
  private statusSelect: HTMLSelectElement;
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
      option.textContent = `${user.name} ${user.surname} - ${Role[user.role]}`;
      this.ownerSelect.appendChild(option);
    });
  }

  public async setOnSubmit(
    onSubmitHandler: (event: Event, story: Story) => void
  ) {
    this.form.onsubmit = async (event: Event) => {
      event.preventDefault();

      const activeProject = await this.projectApiHelper.getActiveProject();
      console.log(activeProject);

      if (activeProject) {
        const story = new Story(
          crypto.randomUUID(),
          this.nameInput.value,
          this.descriptionInput.value,
          Priority[this.prioritySelect.value as keyof typeof Priority],
          Status[this.statusSelect.value as keyof typeof Status],
          new Date(),
          activeProject.uuid,
          this.ownerSelect.value
        );

        this.clearForm();
        onSubmitHandler(event, story);
      } else {
        console.error('No active project found');
      }
    };
  }

  public setStoryData(story: Story): void {
    this.nameInput.value = story.name;
    this.descriptionInput.value = story.description;
    this.prioritySelect.value = Priority[story.priority];
    this.statusSelect.value = Status[story.status];
    this.ownerSelect.value = story.ownerUuid;
  }

  private clearForm(): void {
    this.nameInput.value = '';
    this.descriptionInput.value = '';
    this.prioritySelect.value = '';
    this.statusSelect.value = '';
    this.ownerSelect.value = '';
  }
}

export default StoryForm;
