import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
  Subscribe: "[Subscribe] Action"
};

const initialAuthState = {
  meetingId: undefined,
  subscribeId: undefined
};

export const reducer = persistReducer(
  { storage, key: "qmic-subscribe", whitelist: ["meetingId", "subscribeId"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Subscribe: {
        const { subscribeId } = action.payload;

        return { ...state, subscribeId};
      }
      default:
        return state;
    }
  }
);

export const actions = {
  subscribe: subscribeId => ({ type: actionTypes.Subscribe, payload: { subscribeId } })
};
