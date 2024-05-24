import { Label } from '../components/Label';
import AddButton from '../components/addButton';
import BackButton from '../components/backButton';
import Container from '../components/container';
import HeaderLabel from '../components/headerLabel';
import Modal from '../components/modal';
import StoryForm from '../components/storyForm';
import { ProjectsApiHelper } from '../helpers/projectApiHelper';
import { StoriesApiHelper } from '../helpers/storiesApiHelper';
import { Story } from '../models/story';

const projectApiHelper = new ProjectsApiHelper();
const storiesApiHelper = new StoriesApiHelper();

const currentProject = projectApiHelper.getActiveProject();

new Container('header-container', 'project-page');

new Container('content-container', 'project-page');

const handleClick = (): void => {
  modal.open();
};

new AddButton(
  'Add new story',
  'add-story-btn',
  'content-container',
  handleClick
);

new BackButton('Go to Projects', 'header-container');

new Container('stories-container', 'content-container');

const modal = new Modal('add-form-modal', 'content-container');

const storyForm = new StoryForm('story-form');

storyForm.setOnSubmit((event, story: Story) => {
  storiesApiHelper.create(story);
  //new ProjectItem('projects-container', project);
  modal.close();
});

modal.setContent(storyForm.form);

new HeaderLabel('Manage me', 'title-header', 'header-container');

new Label(
  currentProject?.name ?? 'Project',
  'project-name-label',
  'header-container'
);
