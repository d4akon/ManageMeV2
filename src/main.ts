import AddButton from './components/addButton';
import Container from './components/container';
import HeaderLabel from './components/headerLabel';
import Modal from './components/modal';
import ProjectForm from './components/projectForm';
import ProjectItem from './components/projectItem';
import { ProjectsApiHelper } from './helpers/projectApiHelper';
import { Project } from './models/project';

const projectApiHelper = new ProjectsApiHelper();

new Container('header-container', 'app');

new Container('content-container', 'app');

const handleClick = (): void => {
  modal.open();
};

new AddButton(
  'Add new project',
  'add-project-btn',
  'content-container',
  handleClick
);
new Container('projects-container', 'content-container');

const modal = new Modal('add-form-modal', 'content-container');
const projectForm = new ProjectForm('project-form');

projectForm.setOnSubmit((event, project: Project) => {
  projectApiHelper.create(project);
  new ProjectItem('projects-container', project);
  modal.close();
});

modal.setContent(projectForm.form);

new HeaderLabel('Manage me', 'title-header', 'header-container');

window.onload = () => {
  const projects = projectApiHelper.getAll();
  projects.forEach((project) => new ProjectItem('projects-container', project));
};
