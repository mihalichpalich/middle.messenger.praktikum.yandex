import {AuthAPI} from "@/api";
import {apiHasError, getAvatarImage} from "@/utils";

export async function initApp(dispatch: Dispatch<AppState>) {
  try {
    const path = window.location.pathname;
    const response = await AuthAPI.me();

    if (apiHasError(response)) {
      window.router.go('/');
      return;
    }

    if (path === '/' || path === '/login') {
      window.router.go('/messenger');
    }

    dispatch({user: {...response, avatar: getAvatarImage(response.avatar)}});
  } catch (e) {
    throw e;
  }
}