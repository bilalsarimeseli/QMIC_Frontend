import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API"
};

const initialAuthState = {
  user: undefined,
  authToken: undefined
};

export const reducer = persistReducer(
  { storage, key: "qmic-auth", whitelist: ["user", "authToken", "registered"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        const { authToken } = action.payload;

        return { authToken, user: undefined, registered: false };
      }

      case actionTypes.Register: {
        const { authToken } = action.payload;

        return { authToken, user: undefined };
      }

      case actionTypes.Logout: {
        // TODO: Change this code. Actions in reducer aren't allowed.
        return initialAuthState;
      }

      case actionTypes.UserLoaded: {
        const { user } = action.payload;
        return { ...state, user };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  login: authToken => ({ type: actionTypes.Login, payload: { authToken } }),
  register: registered => ({
    type: actionTypes.Register,
    payload: { registered }
  }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: user => ({ type: actionTypes.UserRequested, payload: { user } }),
  fulfillUser: user => ({ type: actionTypes.UserLoaded, payload: { user } })
};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.Register, function* registerSaga() {
    yield put(actions.fulfillUser(null));
  });

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
    const user =   {
      id: 1,
      username: "Kazim",
      password: "Kartal",
      email: "gazi.kazimkartal@gmail.com",
      roles: [1], // Administrator
      pic: ("/media/users/300_25.jpg"),
      fullname: "Kazim Kartal",
      occupation: "Senior Software Developer",
      companyName: "QMIC",
      phone: "+905068201742",
      address: {
        addressLine: "",
        city: "Etimesgut",
        state: "Ankara",
        postCode: "06930"
      },
      socialNetworks: {
        linkedIn: "https://linkedin.com/admin",
        facebook: "https://facebook.com/admin",
        twitter: "https://twitter.com/admin",
        instagram: "https://instagram.com/admin"
      }
    };

    yield put(actions.fulfillUser(user));
  });
}
