import { Story } from '../models/story';
import { IApiHelper } from './iApiHelper';

export class StoriesApiHelper implements IApiHelper<Story> {
  private readonly STORAGE_KEY = 'Stories';

  private getStoriesFromLocalStorage(): Story[] {
    const storiesJSON = localStorage.getItem(this.STORAGE_KEY);
    if (storiesJSON) {
      try {
        return JSON.parse(storiesJSON);
      } catch (error) {
        console.error('Error parsing stories from local storage:', error);
        return [];
      }
    } else {
      return [];
    }
  }

  get(uuid: string): Story | undefined {
    const stories: Story[] = this.getStoriesFromLocalStorage();
    return stories.find((x) => x.uuid == uuid);
  }

  getAll(): Story[] {
    return this.getStoriesFromLocalStorage();
  }

  create(data: Story) {
    const stories: Story[] = this.getStoriesFromLocalStorage();
    stories.push(data);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stories));
  }

  update(data: Story) {
    const stories: Story[] = this.getStoriesFromLocalStorage();
    const index = stories.findIndex((x) => x.uuid == data.uuid);
    if (index !== -1) {
      stories[index] = data;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stories));
    } else {
      console.error('Story not found for update:', data.uuid);
    }
  }

  delete(uuid: string): void {
    const stories: Story[] = this.getStoriesFromLocalStorage();
    const index = stories.findIndex((x) => x.uuid == uuid);
    if (index !== -1) {
      stories.splice(index, 1);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stories));
    } else {
      console.error('Story not found for deletion:', uuid);
    }
  }

  getAllByProjectsUuid(uuid: string | undefined): Story[] {
    const stories: Story[] = this.getStoriesFromLocalStorage();
    return stories.filter((story) => story.projectUuid == uuid);
  }
}
