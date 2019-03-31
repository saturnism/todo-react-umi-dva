import { Todo } from './types';
import { FirestoreCollectionModel, FirestoreCollectionState } from '@/utils/firestore';
import { Model } from 'dva';
import app from '@/utils/firebase';

const firestore = app.firestore();


export class TodosState implements FirestoreCollectionState<Todo> {
  list: Todo[] = [];
}

const model = new FirestoreCollectionModel<Todo, TodosState>("todos", new TodosState(), app.firestore());

export default model as Model;

