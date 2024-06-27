import { Story } from '../models/story';
import { StoriesApiHelper } from '../helpers/storiesApiHelper';
import Modal from './modal';
import StoryForm from './storyForm';
import { Priority } from '../enums/priority';
import { Role } from '../enums/role';
import { UserApiHelper } from '../helpers/userApiHelper';

class StoryItem {
  private element: HTMLElement;
  private storiesApiHelper: StoriesApiHelper;
  private modal: Modal;
  private userApiHelper: UserApiHelper = new UserApiHelper();

  constructor(parentId: string, story: Story) {
    this.storiesApiHelper = new StoriesApiHelper();
    this.modal = new Modal('edit-form-modal', 'content-container');

    this.element = document.createElement('div');
    this.element.className = 'story-item';

    const title = document.createElement('h2');
    title.className = 'story-item-title';
    title.textContent = story.name;
    title.onclick = () => this.navigateToStory(story);

    const desc = document.createElement('p');
    desc.className = 'story-item-desc';
    desc.textContent = story.description;

    const priority = document.createElement('p');
    priority.className = 'story-item-priority';
    priority.textContent = `Priority: ${Priority[story.priority]}`;

    const assignedUser = document.createElement('p');
    assignedUser.className = 'story-item-assigned-user';

    this.setUserDetails(story.ownerUuid, assignedUser);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'story-item-delete';
    deleteButton.textContent = 'x';
    deleteButton.onclick = () => this.deleteStory(story);

    const editButton = document.createElement('button');
    editButton.className = 'story-item-edit';
    editButton.textContent = 'Edit';
    editButton.onclick = () => this.openEditModal(story);

    this.element.appendChild(deleteButton);
    this.element.appendChild(title);
    this.element.appendChild(desc);
    this.element.appendChild(priority);
    this.element.appendChild(assignedUser);
    this.element.appendChild(editButton);

    const parent: HTMLElement | null = document.getElementById(parentId);
    if (parent) {
      parent.appendChild(this.element);
    } else {
      console.error(`Parent element with id "${parentId}" not found`);
    }
  }

  private async setUserDetails(
    ownerUuid: string,
    assignedUserElement: HTMLElement
  ): Promise<void> {
    try {
      const user = await this.userApiHelper.get(ownerUuid);
      if (user)
        assignedUserElement.textContent = `Assigned to: ${user.name} ${user.surname}`;
    } catch (error) {
      console.error('Failed to fetch user details', error);
      assignedUserElement.textContent = 'Assigned to: Unknown';
    }
  }

  private async deleteStory(story: Story): Promise<void> {
    await this.storiesApiHelper.delete(story.uuid);
    this.element.remove();
  }

  private openEditModal(story: Story): void {
    const editForm = new StoryForm('edit-story-form');
    editForm.setStoryData(story);

    editForm.setOnSubmit(async (event: Event, updatedStory: Story) => {
      updatedStory.uuid = story.uuid;
      await this.storiesApiHelper.update(updatedStory);
      this.modal.close();
      location.reload();
    });

    this.modal.setContent(editForm.form);
    this.modal.open();
  }

  private navigateToStory(story: Story): void {
    window.location.href = `taskView.html?storyId=${story.uuid}`;
  }
}

export default StoryItem;
