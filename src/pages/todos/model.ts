import { FirestoreCollectionModel, FirestoreCollectionState } from '@/utils/firestore';
import app from '@/utils/firebase';



export interface Todo {
  readonly id: string;
  readonly completed: boolean;
  readonly description: string;
  readonly creationTimestamp: Date;
}

export class TodosState implements FirestoreCollectionState<Todo> {
  readonly list: Todo[] = [];
}

const model = new FirestoreCollectionModel<Todo, TodosState>(
  app.firestore(),"todos", new TodosState(), (query) => {
    query.where("completed", "==", false);
  });

export default model;

