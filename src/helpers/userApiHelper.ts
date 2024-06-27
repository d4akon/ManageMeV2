import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import { User } from '../models/user';
import { IApiHelper } from './iApiHelper';
import { db } from './firebase';

export class UserApiHelper implements IApiHelper<User> {
  private readonly STORAGE_KEY = 'users';

  async get(uuid: string): Promise<User | undefined> {
    try {
      const userRef = doc(db, this.STORAGE_KEY, uuid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        return new User(
          userData.uuid,
          userData.name,
          userData.surname,
          userData.email,
          userData.role
        );
      } else {
        console.error('User not found:', uuid);
        return undefined;
      }
    } catch (error) {
      console.error('Error fetching Users:', error);
    }
  }

  async getAll(): Promise<User[]> {
    try {
      const usersRef = collection(db, this.STORAGE_KEY);
      const usersSnapshot = await getDocs(usersRef);
      const usersList = usersSnapshot.docs.map((doc) => {
        const userData = doc.data() as User;
        return new User(
          userData.uuid,
          userData.name,
          userData.surname,
          userData.email,
          userData.role
        );
      });
      return usersList;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  async create(data: User) {
    try {
      await setDoc(doc(db, this.STORAGE_KEY, data.uuid), {
        uuid: data.uuid,
        name: data.name,
        surname: data.surname,
        email: data.email,
        role: data.role,
      });
      console.log('User created successfully');
    } catch (error) {
      console.error('Error creating user: ', error);
    }
  }

  async update(data: User) {
    try {
      const userRef = doc(db, this.STORAGE_KEY, data.uuid);
      await setDoc(
        userRef,
        {
          uuid: data.uuid,
          name: data.name,
          surname: data.surname,
          email: data.email,
          role: data.role,
        },
        { merge: true }
      );
      console.log('User updated successfully');
    } catch (error) {
      console.error('Error updating User:', error);
    }
  }

  async delete(uuid: string) {
    try {
      const userRef = doc(db, this.STORAGE_KEY, uuid);
      await deleteDoc(userRef);
      console.log('User deleted successfully');
    } catch (error) {
      console.error('User deleting story:', error);
    }
  }
}
