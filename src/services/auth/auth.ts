import {AuthAPI} from "@/api";
import {LoginPayload} from "@/api/auth/types";
import {apiHasError, getAvatarImage} from "@/utils";

export async function login(dispatch: Dispatch<AppState>, _: AppState, loginData: LoginPayload) {
  try {
    dispatch({isAuthLoading: true});

    const response = await AuthAPI.login(loginData);

    if (apiHasError(response)) {
      dispatch({isAuthLoading: false, loginFormError: response.reason});
      return;
    }

    const responseUser = await AuthAPI.me();

    if (apiHasError(responseUser)) {
      dispatch(logout);
      return;
    }

    dispatch({user: {...responseUser, avatar: getAvatarImage(responseUser.avatar)}});
    dispatch({loginFormError: null});
    window.router.go('/messenger');
  } catch (e) {
    throw e;
  } finally {
    dispatch({isAuthLoading: false});
  }
}

export async function logout() {
  try {
    await AuthAPI.logout();
    window.router.go('/');
  } catch (e) {
    throw e;
  }
}