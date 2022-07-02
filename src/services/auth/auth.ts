import {authAPI} from "../../api";
import {LoginPayload} from "../../api/auth/types";
import {Dispatch} from "../../core/Store";
import {apiHasError} from "../../utils";

export async function login(dispatch: Dispatch<AppState>, _: AppState, action: LoginPayload) {
  dispatch({isAuthLoading: true});

  const response = await authAPI.login(action);

  if (apiHasError(response)) {
    dispatch({isAuthLoading: false, loginFormError: response.reason});
    return;
  }

  const responseUser = await authAPI.me();

  dispatch({isAuthLoading: false, loginFormError: null});

  if (apiHasError(responseUser)) {
    dispatch(logout);
    return;
  }

  dispatch({user: responseUser});
  window.router.go('/messenger');
}

export async function logout() {
  await authAPI.logout();
  window.router.go('/');
}