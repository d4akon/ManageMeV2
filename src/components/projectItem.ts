import { Project } from '../models/project';
import { ProjectsApiHelper } from '../helpers/projectApiHelper';
import Modal from './modal';
import ProjectForm from './projectForm';

class ProjectItem {
  private element: HTMLElement;
  private projectApiHelper: ProjectsApiHelper;
  private modal: Modal;

  constructor(parentId: string, project: Project) {
    this.projectApiHelper = new ProjectsApiHelper();
    this.modal = new Modal('edit-form-modal', 'content-container');

    this.element = document.createElement('div');
    this.element.className = 'project-item';

    const title = document.createElement('h2');
    title.className = 'project-item-title';
    title.textContent = project.name;

    const desc = document.createElement('h4');
    desc.className = 'project-item-desc';
    desc.textContent = project.description;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'project-item-delete';
    deleteButton.textContent = 'x';
    deleteButton.onclick = () => this.deleteProject(project);

    const editButton = document.createElement('button');
    editButton.className = 'project-item-edit';
    editButton.textContent = 'Edit';
    editButton.onclick = () => this.openEditModal(project);

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

  private deleteProject(project: Project): void {
    this.projectApiHelper.delete(project.uuid);
    this.element.remove();
  }

  private openEditModal(project: Project): void {
    const editForm = new ProjectForm('edit-project-form');
    editForm.setProjectData(project);

    editForm.setOnSubmit((event: Event, updatedProject: Project) => {
      updatedProject.uuid = project.uuid;
      this.projectApiHelper.update(updatedProject);
      this.modal.close();
      location.reload();
    });

    this.modal.setContent(editForm.form);
    this.modal.open();
  }
}

export default ProjectItem;
