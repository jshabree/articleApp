import * as Types from "../actions/types";

const initialUserObj = {
  loggedIn: false,
  pending: false,
  token: "",
  user: {},
};

const handleLoginServerResponseSuccess = (state, action) => {
  let newState = { ...state };
  if (action.result !== undefined) {
    newState = Object.assign({}, state, {
      loggedIn: true,
      pending: false,
      token: action.result.token,
      user: Object.assign({}, action.result.user),
    });
  }
  return { ...newState };
};
const handleLoginServerResponseError = (state, action) => {
  let newState = { ...state };
  return { ...newState };
};

export default (state = initialUserObj, action) => {
  switch (action.type) {
    case Types.LOGIN_USER:
      return Object.assign({}, state, {
        loggedIn: false,
        pending: true,
      });
    case Types.LOGIN_USER_SERVER_RESPONSE_ERROR:
      return handleLoginServerResponseError(state);
    case Types.LOGIN_USER_SERVER_RESPONSE_SUCCESS:
      return handleLoginServerResponseSuccess(state, action);

    case Types.SIGNUP_USER_SERVER_RESPONSE_SUCCESS:
      return handleLoginServerResponseSuccess(state, action);

    case Types.SIGNUP_USER_SERVER_RESPONSE_ERROR:
      return handleLoginServerResponseError(state);

    // case Types.LOGOUT:
    //   return Object.assign({}, state, {
    //     loggedIn: false,
    //     pending: false,
    //     token: "",
    //     user: {},
    //   });

    default:
      return state;
  }
};
