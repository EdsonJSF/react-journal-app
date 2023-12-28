import { checkingCredentials } from ".";

export const checkAuthenticationThunk = (email, password) => {
  return async (dispatch) => {
    console.log(email, password);
    dispatch(checkingCredentials());
  };
};

export const startGoogleSingInThunk = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};
