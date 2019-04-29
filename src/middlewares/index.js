import { ASYNC_START, ASYNC_END } from '../constants';

const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    store.dispatch({ type: ASYNC_START, subtype: action.type });

    const currentView = store.getState().viewChangeCounter;
    const skipTracking = action.skipTracking;

    action.payload.then(
      res => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }

        action.payload = res;
        store.dispatch({ type: ASYNC_END, promise: action.payload, subtype: action.type });
        store.dispatch(action);
      },
      error => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }

        action.error = true;
        action.payload = error;
        if (!action.skipTracking) {
          store.dispatch({ type: ASYNC_END, promise: action.payload, subtype: action.type });
        }
        store.dispatch(action);
      }
    ).catch(e => { console.log('just caught eeee', e)  });

    return;
  }

  next(action);
};

function isPromise(v) {
  return v && typeof v.then === 'function';
}


export { promiseMiddleware }
