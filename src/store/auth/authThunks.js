import { singInWithGoogle } from "../../firebase/provider";
import { checkingCredentials, login, logout } from ".";

export const checkAuthenticationThunk = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSingInThunk = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await singInWithGoogle();

    if (!result.ok) return dispatch(logout(result));

    dispatch(login(result));
  };
};
