export const defaultState: AppState = {
  isAuthLoading: false,
  isSignUpLoading: false,
  isProfileLoading: false,
  isProfileSending: false,
  isAvatarSending: false,
  isPasswordSending: false,
  user: null,
  chatList: [],
  chatId: null,
  chatUsers: [],
  chatMessages: [],
  loginFormError: null,
  signUpFormError: null,
  sendProfileError: null,
  sendPasswordError: null,
  sendAvatarError: null
};