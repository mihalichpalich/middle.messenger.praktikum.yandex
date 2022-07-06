import {ProfileApi} from "../../api";
import {apiHasError, getAvatarImage} from "../../utils";
import {ProfilePayload, PasswordPayload} from "../../api/profile/types";

export async function sendProfile(dispatch: Dispatch<AppState>, state: AppState, action: ProfilePayload) {
  try {
    dispatch({isProfileSending: true});

    const response = await ProfileApi.sendProfile(action);

    if (apiHasError(response)) {
      dispatch({isProfileSending: false, signUpFormError: response.reason});
      return;
    }

    const responseUser = await ProfileApi.getProfile(state?.user?.id as number);

    if (apiHasError(responseUser)) {
      dispatch({isProfileSending: false, signUpFormError: responseUser.reason});
      return;
    }

    dispatch({user: {...responseUser, avatar: getAvatarImage(responseUser.avatar)}});
    dispatch({signUpFormError: null});
  } catch (e) {
    throw e;
  } finally {
    dispatch({isProfileSending: false});
  }
}

export async function changePassword(dispatch: Dispatch<AppState>, _: AppState, action: PasswordPayload) {
  try {
    dispatch({isPasswordSending: true});

    const response = await ProfileApi.changePassword(action);

    if (apiHasError(response)) {
      dispatch({isPasswordSending: false, sendPasswordError: response.reason});
      return;
    }

    dispatch({sendPasswordError: null});
  } catch (e) {
    throw e;
  } finally {
    dispatch({isPasswordSending: false});
  }
}

export async function setAvatar(dispatch: Dispatch<AppState>, state: AppState, action: any) {
  try {
    dispatch({isAvatarSending: true});

    const response = await ProfileApi.setAvatar(action);

    if (apiHasError(response)) {
      dispatch({isAvatarSending: false, sendAvatarError: response.reason});
      return;
    }

    const responseUser = await ProfileApi.getProfile(state?.user?.id as number);

    if (apiHasError(responseUser)) {
      dispatch({isProfileSending: false, signUpFormError: responseUser.reason});
      return;
    }

    dispatch({user: {...responseUser, avatar: getAvatarImage(responseUser.avatar)}});
    dispatch({sendAvatarError: null});
    dispatch({signUpFormError: null});
  } catch (e) {
    throw e;
  } finally {
    dispatch({isAvatarSending: false});
  }
}