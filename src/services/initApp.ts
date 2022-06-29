import {authAPI} from "../api";
import {Dispatch} from "../core/Store";
import {apiHasError} from "../utils";

export async function initApp(dispatch: Dispatch<AppState>) {
  try {
    const response = await authAPI.me();

    if (apiHasError(response)) {
      window.router.go('/');
      return;
    }

    dispatch({userId: response.id});
    window.router.go('/messenger');
  } catch (err) {
    console.error(err);
  }
}