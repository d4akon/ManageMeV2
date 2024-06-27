import { Label } from '../components/Label';
import AddButton from '../components/addButton';
import BackButton from '../components/backButton';
import Container from '../components/container';
import HeaderLabel from '../components/headerLabel';
import Modal from '../components/modal';
import StoryForm from '../components/storyForm';
import StoryItem from '../components/storyItem';
import { ProjectsApiHelper } from '../helpers/projectApiHelper';
import { StoriesApiHelper } from '../helpers/storiesApiHelper';
import { Story } from '../models/story';
import { Status } from '../enums/status';

const projectApiHelper = new ProjectsApiHelper();
const storiesApiHelper = new StoriesApiHelper();

new Container('header-container', 'project-page');
new Container('content-container', 'project-page');

new BackButton('Go to Projects', 'header-container');

const handleClick = (): void => {
  modal.open();
};
new AddButton(
  'Add new story',
  'add-story-btn',
  'content-container',
  handleClick
);

new Container('stories-container', 'content-container');

new Container('stories-container-todo', 'stories-container');
new Container('stories-container-doing', 'stories-container');
new Container('stories-container-done', 'stories-container');

new Label('ToDo', 'todo-label', 'stories-container-todo');
new Label('Doing', 'doing-label', 'stories-container-doing');
new Label('Done', 'done-label', 'stories-container-done');

const modal = new Modal('add-form-modal', 'content-container');
const storyForm = new StoryForm('story-form');

storyForm.setOnSubmit(async (event, story: Story) => {
  await storiesApiHelper.create(story);
  modal.close();
  location.reload();
});

modal.setContent(storyForm.form);

window.onload = async () => {
  try {
    const currentProject = await projectApiHelper.getActiveProject();

    if (currentProject) {
      const stories = await storiesApiHelper.getAllByProjectsUuid(
        currentProject.uuid
      );

      console.log(stories);

      stories.forEach((story) => {
        switch (story.status) {
          case Status.ToDo:
            new StoryItem('stories-container-todo', story);
            break;
          case Status.Doing:
            new StoryItem('stories-container-doing', story);
            break;
          case Status.Done:
            new StoryItem('stories-container-done', story);
            break;
          default:
            break;
        }
      });

      new Label(
        currentProject.name ?? 'Project',
        'project-name-label',
        'header-container'
      );
    } else {
      console.error('No active project found');
    }
  } catch (error) {
    console.error('Error fetching stories:', error);
  }
};
