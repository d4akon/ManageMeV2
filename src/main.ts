import AddButton from './components/addButton';
import Container from './components/container';
import HeaderLabel from './components/headerLabel';
import Modal from './components/modal';
import ProjectForm from './components/projectForm';
import ProjectItem from './components/projectItem';
import { ProjectsApiHelper } from './helpers/projectApiHelper';
import { Project } from './models/project';

const projectApiHelper = new ProjectsApiHelper();

// @ts-ignore: Unused parameter
const headerContainer = new Container('header-container', 'app');

// @ts-ignore: Unused parameter
const contentContainer = new Container('content-container', 'app');

const handleClick = (): void => {
  modal.open();
};

// @ts-ignore: Unused parameter
const addButton = new AddButton(
  'Add new project',
  'add-project-btn',
  'content-container',
  handleClick
);

// @ts-ignore: Unused parameter
const projectsContainer = new Container(
  'projects-container',
  'content-container'
);

// @ts-ignore: Unused parameter
const modal = new Modal('add-form-modal', 'content-container');

// @ts-ignore: Unused parameter
const headerLabel = new HeaderLabel(
  'Manage me',
  'title-header',
  'header-container'
);

const projectForm = new ProjectForm('project-form');

projectForm.setOnSubmit((event, project: Project) => {
  projectApiHelper.create(project);
  // @ts-ignore: Unused parameter
  const projectItem = new ProjectItem('projects-container', project);
  modal.close();
});

modal.setContent(projectForm.form);
