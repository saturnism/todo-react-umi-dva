import { Todo } from './types';
import firebaseApp from '@/utils/firebase';
import firebase from 'firebase';
import QuerySnapshot = firebase.firestore.QuerySnapshot;

const firestore = firebaseApp.firestore();

export class TodoService {
  async create(item: Todo) {
    return firestore.collection("todos")
      .add({
        ...item,
        completed: false,
      });
  }

  async delete(id: string) {
    return firestore.collection("todos")
      .doc(id)
      .delete();
  }

  async update(id: string, item: Todo) {
    return firestore.collection("todos")
      .doc(id)
      .update(item);
  }

  subscribeIncomplete(callback : (snapshot : QuerySnapshot) => void) {
    return firestore.collection('todos')
      .where('completed', '==', false)
      .onSnapshot(callback);
  }
}
