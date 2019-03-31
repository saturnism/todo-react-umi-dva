import app from '@/utils/firebase';
import { EffectsMapObject, Model, ReducersMapObjectWithEnhancer, SubscriptionsMapObject } from 'dva';
import { ReducersMapObject } from 'redux';

export interface OnlineState {
  readonly online : boolean;
}

interface OnlineModel extends Model {
  state: OnlineState;
}

const model : OnlineModel = {
  namespace: 'online',
  state: { online: false },
  reducers: {
    update(state : OnlineState, action) {
      return {
        ...state,
        online: action.payload,
      }
    }
  },
  subscriptions: {
    setup({ dispatch }, done) {
      app.database().ref(".info/connected").on('value', snapshot => {
        dispatch({
          type: 'update',
          payload: snapshot.val(),
        })
      });
    }
  }
};

export default model;

