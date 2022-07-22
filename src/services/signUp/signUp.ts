import {SignUpAPI} from "@/api";
import {SignUpPayload} from "@/api/signUp/types";
import {apiHasError} from "@/utils";

export async function signUp(dispatch: Dispatch<AppState>, _: AppState, action: SignUpPayload) {
  try {
    dispatch({isSignUpLoading: true});

    const response = await SignUpAPI.signUp(action);

    if (apiHasError(response)) {
      dispatch({isSignUpLoading: false, signUpFormError: response.reason});
      return;
    }

    dispatch({signUpFormError: null});
    window.router.go('/settings');
  } catch (e) {
    throw e;
  } finally {
    dispatch({isSignUpLoading: false});
  }
}