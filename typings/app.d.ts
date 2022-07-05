declare global {
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  export type Indexed = { [key: string]: any };

  export interface ClickableItemProps {
    onClick?: () => void;
    events?: {
      click?: () => void;
    };
  }

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
    loginFormError: string | null;
    signUpFormError: string | null;
    sendProfileError: string | null;
    sendPasswordError: string | null;
    sendAvatarError: string | null;
    user: null | User;
    chatList: ChatListItemData[];
    chatId: number | null;
    chatUsers: string[];
    chatMessages: ChatMessage[];
    isAddChatFormOpened: boolean;
    isAddUserFormOpened: boolean;
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

  export type ChatUser = User & {role: 'regular' | 'admin'};

  export type ChatListItemData = {
    id: number;
    title: string;
    chatAvatar: string | null;
    unreadCount: number;
    time: string;
    text: string;
  }

  export type ChatMessage = {
    time: string;
    userId: string;
    text: string;
  }
}

export {};