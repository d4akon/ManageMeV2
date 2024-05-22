import { Project } from '../models/project';

class ProjectForm {
  public form: HTMLFormElement;
  private projectInput: HTMLInputElement;
  private descInput: HTMLInputElement;

  constructor(idName: string) {
    this.form = document.createElement('form');
    this.form.className = 'form-component';
    this.form.id = idName;

    this.projectInput = document.createElement('input');
    this.projectInput.type = 'text';
    this.projectInput.placeholder = 'Enter project name';
    this.projectInput.name = 'projectName';

    this.descInput = document.createElement('input');
    this.descInput.type = 'text';
    this.descInput.placeholder = 'Enter project description';
    this.descInput.name = 'projectDescription';

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';

    this.form.appendChild(this.projectInput);
    this.form.appendChild(this.descInput);
    this.form.appendChild(submitButton);
  }

  public setOnSubmit(
    onSubmitHandler: (event: Event, project: Project) => void
  ): void {
    this.form.onsubmit = (event: Event) => {
      event.preventDefault();
      const project = new Project(
        this.projectInput.value,
        this.descInput.value
      );
      onSubmitHandler(event, project);
    };
  }
}

export default ProjectForm;
