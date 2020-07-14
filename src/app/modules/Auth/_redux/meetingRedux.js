import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
  CreateMeeting: "[Create] Action"
};

const initialMeetingState = {
  meetingId: undefined
};

export const reducer = persistReducer(
  { storage, key: "qmic", whitelist: ["meetingId"] },
  (state = initialMeetingState, action) => {
    switch (action.type) {
      case actionTypes.CreateMeeting: {
        const { meetingId } = action.payload;
        return { ...state, meetingId };
      }
      default:
        return state;
    }
  }
);

export const actions = {
  crateMeeting: meetingId => ({ type: actionTypes.CreateMeeting, payload: { meetingId } })
};

export function* saga() {

}