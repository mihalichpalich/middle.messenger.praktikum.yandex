import {request} from "../../core";
import {ProfilePayload, PasswordPayload} from "./types";

export const profileApi = {
  sendProfile: (data: ProfilePayload) => request.put<User>('user/profile', data),
  getProfile: (id: number) => request.get<User>(`user/${id}`),
  changePassword: (data: PasswordPayload) => request.put<User>('user/password', data),
  setAvatar: (data: any) => request.put<User>('user/profile/avatar', data, "multipart/form-data"),
};