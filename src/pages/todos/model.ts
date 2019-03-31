import { FirestoreCollectionModel, FirestoreCollectionState } from '@/utils/firestore';
import app from '@/utils/firebase';

export interface Todo {
  id: string;
  completed: boolean;
  description: string;
  creationTimestamp: Date;
}

export class TodosState implements FirestoreCollectionState<Todo> {
  list: Todo[] = [];
}

const model = new FirestoreCollectionModel<Todo, TodosState>(
  app.firestore(),"todos", new TodosState(),[{fieldPath: 'completed', opStr: '==', value: false}]);

export default model;

