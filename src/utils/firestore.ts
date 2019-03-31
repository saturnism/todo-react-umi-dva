import { EffectsMapObject, Model, ReducersMapObjectWithEnhancer, SubscriptionsMapObject } from 'dva';
import { ReducersMapObject } from 'redux';
import firebase from 'firebase';
import Query = firebase.firestore.Query;
import Firestore = firebase.firestore.Firestore;
import pathToRegexp from 'path-to-regexp'

export interface FirestoreCollectionState<T> {
  readonly list: T[],
}

export class FirestoreCollectionModel<T, S extends FirestoreCollectionState<T>> implements Model {
  namespace: string;
  state: S;
  effects: EffectsMapObject;
  reducers: ReducersMapObject | ReducersMapObjectWithEnhancer;
  subscriptions: SubscriptionsMapObject;

  constructor(firestore : Firestore, collection : string, initialState : S, query? : (Query) => void ) {
    this.namespace = collection;
    this.state = initialState;
    this.effects = {
      *push({payload}, {call}) {
        yield call(() => {
          firestore.collection(collection).add(payload);
        });
      },
      *update({id, payload}, {call}) {
        yield call(() => {
          firestore.collection(collection).doc(id).update(payload);
        })
      },
      *delete({id}, {call}) {
        yield call(() => {
          firestore.collection(collection).doc(id).delete();
        })
      },
      *toArray({ payload }, { put }) {
        const list : T[] = [];
        payload.snapshot.forEach(doc => {
          list.push({
            ...doc.data() as T,
            id: doc.id,
          })
        });
        yield put({
          type: 'all',
          payload: list,
        });
      }
    };

    this.reducers = {
      all(state : T, { payload }) {
        return {
          ...state,
          list: payload
        }
      },
    };

    this.subscriptions = {
      setup({history, dispatch}, done) {
        let unsubscribe : Function;
        history.listen(({pathname}) => {
          const match = pathToRegexp('/' + collection).exec(pathname)
          if (match && !unsubscribe ) {
            var ref = firestore.collection(collection) as Query;
            if (query) {
              query(ref);
            }

            unsubscribe = ref.onSnapshot(snapshot => {
              dispatch({
                type: 'toArray',
                payload: { snapshot: snapshot },
              })
            });
          } else if (!match && unsubscribe) {
            unsubscribe();
            unsubscribe = null;
          }
        });
      }
    };
  }
};
