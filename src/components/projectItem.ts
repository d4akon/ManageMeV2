import { Project } from '../models/project';

class ProjectItem {
  private element: HTMLElement;

  constructor(parentId: string, project: Project) {
    console.log(JSON.stringify(project));

    this.element = document.createElement('div');
    this.element.className = 'project-item';

    const title = document.createElement('h2');
    title.className = 'project-item-title';
    title.textContent = project.name;

    const desc = document.createElement('h4');
    desc.className = 'project-item-desc';
    desc.textContent = project.description;

    this.element.appendChild(title);
    this.element.appendChild(desc);

    const parent: HTMLElement | null = document.getElementById(parentId);
    if (parent) {
      parent.appendChild(this.element);
    } else {
      console.error('Parent element with id "${parentId}" not found');
    }
  }
}

export default ProjectItem;
