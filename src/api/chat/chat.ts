import {request} from "../../core";
import {ChatListPayload, ChatTokenItem, AddChatPayload, UserSearchPayload, AddUserPayload} from "./types";

export const ChatApi = {
  getChatList: () => request.get<ChatListPayload[]>('/chats'),
  getChatUsers: (id: string) => request.get<ChatUser[]>(`/chats/${id}/users`),
  getChatToken: (id: string) => request.post<ChatTokenItem>(`/chats/token/${id}`),
  addChat: (payload: AddChatPayload) => request.post('/chats', payload),
  userSearch: (payload: UserSearchPayload) => request.post<User[]>('/user/search', payload),
  addUser: (payload: AddUserPayload) => request.put('/chats/users', payload),
  deleteUser: (payload: AddUserPayload) => request.delete('/chats/users', payload),
};