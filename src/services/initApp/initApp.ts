import {authAPI} from "../../api";
import {Dispatch} from "../../core/Store";
import {apiHasError} from "../../utils";
import {UserPayload} from "../../api/auth/types";

export async function initApp(dispatch: Dispatch<AppState>) {
  try {
    const path = window.location.pathname;
    const response = await authAPI.me();

    if (apiHasError(response)) {
      window.router.go('/');
      return;
    }

    if (path === '/' || path === '/login') {
      window.router.go('/messenger');
    }

    dispatch({userId: (response as UserPayload).id});
  } catch (err) {
    console.error(err);
  }
}