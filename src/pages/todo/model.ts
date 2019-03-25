import { Todo } from './types';
import { TodoService } from './service';

const service = new TodoService();

export class TodoState {
  list: Todo[] = [];
}

export default {
  namespace: 'todos',

  state: new TodoState(),

  effects: {
    *all({ payload }, { call, put }) {
      const response = yield call(service.all);
      yield put({
        type: 'incomplete',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *add({ payload }, { call, put }) {
      const response = yield call(service.create, payload);
      yield put({
        type: 'incomplete',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *complete({ payload }, { call, put }) {
      const response = yield call(service.update, payload);
      yield put({
        type: 'incomplete',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    incomplete(state: TodoState, action) {
      return {
        ...state,
        list: action.payload.filter(item => !item.completed),
      };
    },
  },
};
