declare global {
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  export type Indexed = { [key: string]: any };

  export type APIError = {
    reason: string;
  };

  export type AppState = {
    isAuthLoading: boolean;
    isSignUpLoading: boolean;
    isProfileLoading: boolean;
    isProfileSending: boolean;
    isAvatarSending: boolean;
    isPasswordSending: boolean;
    user: null | User;
    loginFormError: string | null;
    signUpFormError: string | null;
    sendProfileError: string | null;
    sendPasswordError: string | null;
    sendAvatarError: string | null;
  };

  export type User = {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string | null;
    login: string;
    avatar: string | null;
    email: string;
    phone: string;
  }
}

export {};