import { Todo } from './types';
import { TodoService } from './service';
import { Model } from 'dva';

const service = new TodoService();

export class TodoState {
  list: Todo[] = [];
}

interface TodoModel extends Model{
  state: TodoState
}

const model : TodoModel = {
  namespace: 'todos',
  state: new TodoState(),

  effects: {
    *add({ payload }, { call, put }) {
      const response = yield call(service.create, payload);
    },
    *complete({ payload }, { call, put }) {
      const response = yield call(service.update, payload.id, payload);
    },
    *convert({ payload }, { put }) {
      const list : Todo[] = [];
      payload.snapshot.forEach(doc => {
        list.push({
          ...doc.data() as Todo,
          id: doc.id,
        })
      });
      yield put({
        type: 'incomplete',
        payload: list,
      })
    }
  },

  reducers: {
    // A little hack here, to only return items where item.completed = false
    incomplete(state: TodoState, action) {
      return {
        ...state,
        list: action.payload.filter(item => !item.completed),
      };
    },

  },

  subscriptions: {
    setup({ history, dispatch}) {
      let unsubscribe;
      history.listen(({ pathname }) => {
        if (!unsubscribe && pathname.startsWith("/todo")) {
          unsubscribe = service.subscribeIncomplete(snapshot => {
            dispatch({
              type: "convert",
              payload: { snapshot: snapshot }
            })
          });
        } else if (unsubscribe) {
          unsubscribe();
        }
      });
    }
  }
};

export default model;
