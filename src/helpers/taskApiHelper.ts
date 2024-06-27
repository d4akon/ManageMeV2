import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import { Task } from '../models/task';
import { IApiHelper } from './iApiHelper';
import { db } from './firebase';

export class TaskApiHelper implements IApiHelper<Task> {
  private readonly STORAGE_KEY = 'tasks';

  async get(uuid: string): Promise<Task | undefined> {
    try {
      const taskRef = doc(db, this.STORAGE_KEY, uuid);
      const taskDoc = await getDoc(taskRef);

      if (taskDoc.exists()) {
        const taskData = taskDoc.data() as Task;
        return new Task(
          taskData.uuid,
          taskData.name,
          taskData.description,
          taskData.hoursToComplete,
          taskData.priority,
          taskData.storyUuid,
          taskData.status,
          taskData.dateOfCreation,
          taskData.dateOfStart,
          taskData.dateOfFinish,
          taskData.assignedUserUuid
        );
      } else {
        console.error('Task not found:', uuid);
        return undefined;
      }
    } catch (error) {
      console.error('Error fetching Task:', error);
      return undefined;
    }
  }

  async getAll(): Promise<Task[]> {
    try {
      const tasksRef = collection(db, this.STORAGE_KEY);
      const tasksSnapshot = await getDocs(tasksRef);
      const tasksList = tasksSnapshot.docs.map((doc) => {
        const taskData = doc.data() as Task;
        return new Task(
          taskData.uuid,
          taskData.name,
          taskData.description,
          taskData.hoursToComplete,
          taskData.priority,
          taskData.storyUuid,
          taskData.status,
          taskData.dateOfCreation,
          taskData.dateOfStart,
          taskData.dateOfFinish,
          taskData.assignedUserUuid
        );
      });
      return tasksList;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  }

  async create(data: Task) {
    try {
      await setDoc(doc(db, this.STORAGE_KEY, data.uuid), {
        uuid: data.uuid,
        name: data.name,
        description: data.description,
        hoursToComplete: data.hoursToComplete,
        priority: data.priority,
        storyUuid: data.storyUuid,
        status: data.status,
        dateOfCreation: data.dateOfCreation,
        dateOfStart: data.dateOfStart,
        dateOfFinish: data.dateOfFinish,
        assignedUserUuid: data.assignedUserUuid,
      });
      console.log('Task created successfully');
    } catch (error) {
      console.error('Error creating story: ', error);
    }
  }

  async update(data: Task) {
    try {
      const taskRef = doc(db, this.STORAGE_KEY, data.uuid);
      await setDoc(
        taskRef,
        {
          uuid: data.uuid,
          name: data.name,
          description: data.description,
          hoursToComplete: data.hoursToComplete,
          priority: data.priority,
          storyUuid: data.storyUuid,
          status: data.status,
          dateOfCreation: data.dateOfCreation,
          dateOfStart: data.dateOfStart,
          dateOfFinish: data.dateOfFinish,
          assignedUserUuid: data.assignedUserUuid,
        },
        { merge: true }
      );
      console.log('Task updated successfully');
    } catch (error) {
      console.error('Error updating Task:', error);
    }
  }

  async delete(uuid: string) {
    try {
      const taskRef = doc(db, this.STORAGE_KEY, uuid);
      await deleteDoc(taskRef);
      console.log('Task deleted successfully');
    } catch (error) {
      console.error('Task deleting story:', error);
    }
  }

  async getAllByStoryUuid(uuid: string | null): Promise<Task[]> {
    const tasks = await this.getAll();
    return tasks.filter((task) => task.storyUuid == uuid);
  }
}
