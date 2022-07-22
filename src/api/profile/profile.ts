import {request} from "@/core";
import {ProfilePayload, PasswordPayload} from "./types";

export const ProfileApi = {
  sendProfile: (data: ProfilePayload) => request.put<User>('user/profile', data),
  getProfile: (id: number) => request.get<User>(`user/${id}`),
  changePassword: (data: PasswordPayload) => request.put<User>('user/password', data),
  setAvatar: (data: FormData) => request.put<User>('user/profile/avatar', data, "multipart/form-data"),
};