import { Label } from '../components/Label';
import AddButton from '../components/addButton';
import Container from '../components/container';
import HeaderLabel from '../components/headerLabel';
import Modal from '../components/modal';
import ProjectForm from '../components/projectForm';
import ProjectItem from '../components/projectItem';
import { Role } from '../enums/role';
import { ProjectsApiHelper } from '../helpers/projectApiHelper';
import { UserApiHelper } from '../helpers/userApiHelper';
import { Project } from '../models/project';
import { User } from '../models/user';
import { UserService } from '../services/userService';

const projectApiHelper = new ProjectsApiHelper();
const userApiHelper = new UserApiHelper();

const testUser1 = new User('Andrzej', 'Nowak', 'Test', Role.Admin);
const testUser2 = new User('Tomasz', 'Nowak', 'haslo', Role.Developer);
const testUser3 = new User('Jan', 'Duda', 'haslo1', Role.Devops);

if (!localStorage.getItem('Users')) {
  userApiHelper.create(testUser1);
  userApiHelper.create(testUser2);
  userApiHelper.create(testUser2);
}

UserService.loginUser(testUser1);

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

const currentUser = UserService.getLoggedInUser();
const welcomeMessage = `Welcome ${currentUser?.name} ${currentUser?.surname}!`;
new Label(welcomeMessage, 'welcome-label', 'header-container');

window.onload = () => {
  const projects = projectApiHelper.getAll();
  projects.forEach((project) => new ProjectItem('projects-container', project));
};
