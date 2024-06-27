import { Label } from '../components/Label';
import AddButton from '../components/addButton';
import Container from '../components/container';
import HeaderLabel from '../components/headerLabel';
import { LoginButton } from '../components/loginButton';
import { LogoutButton } from '../components/logoutButton';
import Modal from '../components/modal';
import ProjectForm from '../components/projectForm';
import ProjectItem from '../components/projectItem';
import { RegisterButton } from '../components/registerButton';
import { Role } from '../enums/role';
import { ProjectsApiHelper } from '../helpers/projectApiHelper';
import { UserApiHelper } from '../helpers/userApiHelper';
import { Project } from '../models/project';
import { User } from '../models/user';
import { UserService } from '../services/userService';

const projectApiHelper = new ProjectsApiHelper();
const userApiHelper = new UserApiHelper();

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

projectForm.setOnSubmit(async (event, project: Project) => {
  await projectApiHelper.create(project);
  new ProjectItem('projects-container', project);
  modal.close();
});

modal.setContent(projectForm.form);

new HeaderLabel('Manage me', 'title-header', 'header-container');

new LoginButton('login-button', 'title-header');
new RegisterButton('register-button', 'title-header');
new LogoutButton('logout-button', 'title-header');

const currentUser = UserService.getLoggedInUser();

if (currentUser) {
  const welcomeMessage = `Welcome ${currentUser?.name} ${currentUser?.surname}!`;
  new Label(welcomeMessage, 'welcome-label', 'header-container');
}

window.onload = async () => {
  const projects = await projectApiHelper.getAll();
  projects.forEach((project) => new ProjectItem('projects-container', project));

  const testUser1 = new User(
    'MwNHkTAwBGXVAG8ts2nQJfOmqP13',
    'Andrzej',
    'Nowak',
    'andrzej.nowak@manage.com',
    Role.Admin
  );
  const testUser2 = new User(
    'qELsw8TyibNTZEMgzJBbkdifaBy2',
    'Tomasz',
    'Nowak',
    'tomasz.nowak@manage.com',
    Role.Developer
  );
  const testUser3 = new User(
    'hPYieW81oNWXTm1bCpn4r5FiAsk2',
    'Jan',
    'Duda',
    'jan.duda@manage.com',
    Role.Devops
  );

  const allUsers = await userApiHelper.getAll();
  console.log(allUsers);

  if (allUsers.length == 0) {
    await userApiHelper.create(testUser1);
    await userApiHelper.create(testUser2);
    await userApiHelper.create(testUser3);
  }
};
