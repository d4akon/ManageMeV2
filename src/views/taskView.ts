import { Label } from '../components/Label';
import AddButton from '../components/addButton';
import BackButton from '../components/backButton';
import Container from '../components/container';
import HeaderLabel from '../components/headerLabel';
import Modal from '../components/modal';
import TaskForm from '../components/taskForm';
import TaskItem from '../components/taskItem';
import { Status } from '../enums/status';
import { ProjectsApiHelper } from '../helpers/projectApiHelper';
import { TaskApiHelper } from '../helpers/taskApiHelper';
import { Task } from '../models/task';

const urlParams = new URLSearchParams(window.location.search);
const storyId = urlParams.get('storyId');

const taskApiHelper = new TaskApiHelper();
const projectApiHelper = new ProjectsApiHelper();

new Container('header-container', 'story-page');
new Container('content-container', 'story-page');

new BackButton('Go to Story', 'header-container');

const handleClick = (): void => {
  modal.open();
};
new AddButton('Add new task', 'add-task-btn', 'content-container', handleClick);

new Container('tasks-container', 'content-container');

new Container('tasks-container-todo', 'tasks-container');
new Container('tasks-container-doing', 'tasks-container');
new Container('tasks-container-done', 'tasks-container');

new Label('ToDo', 'todo-label', 'tasks-container-todo');
new Label('Doing', 'doing-label', 'tasks-container-doing');
new Label('Done', 'done-label', 'tasks-container-done');

const modal = new Modal('add-form-modal', 'content-container');
const taskForm = new TaskForm('task-form', storyId);

taskForm.setOnSubmit((event, task: Task) => {
  taskApiHelper.create(task);
  modal.close();
  location.reload();
});

modal.setContent(taskForm.form);

new HeaderLabel('Manage me', 'title-header', 'header-container');

const currentProject = projectApiHelper.getActiveProject();
new Label(
  currentProject?.name ?? 'Project',
  'project-name-label',
  'header-container'
);

window.onload = () => {
  const tasks = taskApiHelper.getAllByStoryUuid(storyId);
  tasks.forEach((task) => {
    switch (task.status) {
      case Status.ToDo:
        new TaskItem('tasks-container-todo', task);
        break;
      case Status.Doing:
        new TaskItem('tasks-container-doing', task);
        break;
      case Status.Done:
        new TaskItem('tasks-container-done', task);
        break;
      default:
        break;
    }
  });
};
