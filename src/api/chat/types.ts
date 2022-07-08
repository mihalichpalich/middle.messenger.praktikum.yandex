export type ChatListPayload = {
  id: number;
  title: string;
  avatar: null | string;
  created_by: number;
  unread_count: number;
  last_message?: {
    user: Omit<User, 'id' | 'display_name'>,
    time: string;
    content: string;
    id: number;
  }
}

export type ChatTokenItem = {
  token: string;
};

export type ChatMessagePayload = {
  chat_id: number;
  time: string;
  type: string;
  user_id: string;
  content: string;
};

export type AddChatPayload = {
  title: string;
};

export type UserSearchPayload = {
  login: string;
};

export type AddUserPayload = {
  users: number[];
  chatId: number;
}
