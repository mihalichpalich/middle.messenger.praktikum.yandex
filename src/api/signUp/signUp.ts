import {request} from "../../core";
import {SignUpPayload, SignUpResponse} from "./types";

export const signUpAPI = {
  signUp: (data: SignUpPayload) => request.post<SignUpResponse>('auth/signup', data),
};