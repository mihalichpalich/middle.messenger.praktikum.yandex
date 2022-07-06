import {request} from "../../core";
import {LoginPayload} from "./types";

export const AuthAPI = {
  login: (data: LoginPayload) => request.post('auth/signin', data),
  me: () => request.get<User>('auth/user'),
  logout: () => request.post('auth/logout'),
};