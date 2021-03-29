import * as Types from './types';

export const loginUser = (email, password) => {
  return {
    type: Types.LOGIN_USER,
    email,
    password
  }
}

export const logoutUser = () => {
  return {
    type: Types.USER_LOGOUT
  }
}

export const signupUser = user => ({
  type: Types.SIGNUP_USER,
  user
});
