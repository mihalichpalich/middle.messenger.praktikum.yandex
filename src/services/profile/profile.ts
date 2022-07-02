import {profileApi} from "../../api";
import {Dispatch} from "../../core/Store";
import {apiHasError} from "../../utils";
import {ProfilePayload, PasswordPayload} from "../../api/profile/types";

export async function sendProfile(dispatch: Dispatch<AppState>, state: AppState, action: ProfilePayload) {
  dispatch({isProfileSending: true});

  const response = await profileApi.sendProfile(action);

  if (apiHasError(response)) {
    dispatch({isProfileSending: false, signUpFormError: response.reason});
    return;
  }

  const responseUser = await profileApi.getProfile(state?.user?.id as number);

  if (apiHasError(responseUser)) {
    dispatch({isProfileSending: false, signUpFormError: responseUser.reason});
    return;
  }

  dispatch({user: responseUser});
  dispatch({isProfileSending: false, signUpFormError: null});
}

export async function changePassword(dispatch: Dispatch<AppState>, _: AppState, action: PasswordPayload) {
  dispatch({isPasswordSending: true});

  const response = await profileApi.changePassword(action);

  if (apiHasError(response)) {
    dispatch({isPasswordSending: false, sendPasswordError: response.reason});
    return;
  }

  dispatch({isPasswordSending: false, sendPasswordError: null});
}

export async function setAvatar(dispatch: Dispatch<AppState>, state: AppState, action: any) {
  dispatch({isAvatarSending: true});

  const response = await profileApi.setAvatar(action);

  if (apiHasError(response)) {
    dispatch({isAvatarSending: false, sendAvatarError: response.reason});
    return;
  }

  const responseUser = await profileApi.getProfile(state?.user?.id as number);

  if (apiHasError(responseUser)) {
    dispatch({isProfileSending: false, signUpFormError: responseUser.reason});
    return;
  }

  dispatch({user: responseUser});
  dispatch({isAvatarSending: false, sendAvatarError: null});
}