import {authAPI} from "../../api";
import {Dispatch} from "../../core/Store";
import {apiHasError} from "../../utils";

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

    dispatch({user: response});

    if (path === '/settings') {
      return response;
    }
  } catch (err) {
    console.error(err);
  }
}