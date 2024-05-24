import { Project } from '../models/project';
import { IApiHelper } from './iApiHelper';

export class ProjectsApiHelper implements IApiHelper<Project> {
  private readonly STORAGE_KEY = 'Projects';

  private getProjectsFromLocalStorage(): Project[] {
    const projectsJSON = localStorage.getItem(this.STORAGE_KEY);
    if (projectsJSON) {
      try {
        return JSON.parse(projectsJSON);
      } catch (error) {
        console.error('Error parsing projects from local storage:', error);
        return [];
      }
    } else {
      return [];
    }
  }

  get(uuid: string): Project | undefined {
    const projects: Project[] = this.getProjectsFromLocalStorage();
    return projects.find((x) => x.uuid == uuid);
  }

  getAll(): Project[] {
    return this.getProjectsFromLocalStorage();
  }

  create(data: Project) {
    const projects: Project[] = this.getProjectsFromLocalStorage();
    projects.push(data);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
  }

  update(data: Project) {
    const projects: Project[] = this.getProjectsFromLocalStorage();
    const index = projects.findIndex((x) => x.uuid == data.uuid);
    if (index !== -1) {
      projects[index] = data;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
    } else {
      console.error('Project not found for update:', data.uuid);
    }
  }

  delete(uuid: string): void {
    const projects: Project[] = this.getProjectsFromLocalStorage();
    const index = projects.findIndex((x) => x.uuid == uuid);
    if (index !== -1) {
      projects.splice(index, 1);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
    } else {
      console.error('Project not found for deletion:', uuid);
    }
  }

  getActiveProject(): Project | undefined {
    const projects: Project[] = this.getProjectsFromLocalStorage();
    return projects.find((x) => x.isActive == true);
  }
}
