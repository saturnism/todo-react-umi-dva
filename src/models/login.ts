import app from '@/utils/firebase'
import { Model } from 'dva'
import * as firebase from 'firebase'
import { Dispatch } from 'redux'

export interface LoginRequest {
  providerName: string
}


export type LoginActionTypes =
  | { type: "login/login", payload: LoginRequest }

export type LoginDispatch = Dispatch<LoginActionTypes>

export interface LoginState {
  readonly loggedIn : boolean;
  readonly uid? : string;
}

interface LoginModel extends Model {
  state: LoginState;
}

const model : LoginModel = {
  namespace: 'login',
  state: {
    loggedIn: false,
  },
  effects: {
    *login({ payload, onSuccess, onError }, { call, put }) {
      var providerName = payload.providerName
      try {
        yield app.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        const response = yield call(() => {
          var provider = new firebase.auth.FacebookAuthProvider()
          return app.auth().signInWithPopup(provider)
        });

        if (response) {
          yield onSuccess(response)
          yield put({
            type: 'loggedIn',
            payload: {
              user: response.user
            }
          })
        } else {
          yield onError("failed")
        }
      } catch (error) {
        yield onError(error.code, error.message)
      }
    },
    *logout({}, { call, put }) {
      yield call( () => {
        return app.auth().signOut()
      })
      yield put({
        type: 'loggedOut'
      })
    }
  },
  reducers: {
    loggedIn(state : LoginModel, { payload }) : LoginState {
      return {
        ...state,
        loggedIn: true,
        uid: payload.user.uid
      }
    },
    loggedOut(state : LoginModel, action) : LoginState{
      return {
        loggedIn: false,
        uid: undefined,
      }
    }
  },
  subscriptions: {
    setup({ dispatch }, done) {
      app.auth().onAuthStateChanged(user => {
        if (!user) {
          dispatch({
            type: 'loggedOut'
          })
        } else {
          dispatch({
            type: 'loggedIn',
            payload: {
              user: user
            }
          })
        }
      })
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

