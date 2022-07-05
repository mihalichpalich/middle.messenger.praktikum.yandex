import {signUpAPI} from "../../api";
import {SignUpPayload} from "../../api/signUp/types";
import {Dispatch} from "../../core/Store";
import {apiHasError} from "../../utils";

export async function signUp(dispatch: Dispatch<AppState>, _: AppState, action: SignUpPayload) {
  dispatch({isSignUpLoading: true});

  const response = await signUpAPI.signUp(action);

  if (apiHasError(response)) {
    dispatch({isSignUpLoading: false, signUpFormError: response.reason});
    return;
  }

  dispatch({isSignUpLoading: false, signUpFormError: null});

  window.router.go('/settings');
}