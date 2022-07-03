import {request} from "../../core";
import {ChatListPayload, ChatTokenItem} from "./types";

export const chatApi = {
  getChatList: () => request.get<ChatListPayload[]>('/chats'),
  getChatUsers: (id: string | number) => request.get<ChatUser[]>(`/chats/${id}/users`),
  getChatToken: (id: string | number) => request.post<ChatTokenItem>(`/chats/token/${id}`),
};