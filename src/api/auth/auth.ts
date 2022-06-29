import {request} from "../../core";
import {LoginPayload, UserPayload} from "./types";

export const authAPI = {
  login: (data: LoginPayload) => request.post('auth/signin', data),
  me: () => request.get<UserPayload>('auth/user'),
  logout: () => request.post('auth/logout'),
};