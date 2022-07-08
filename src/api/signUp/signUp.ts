import {request} from "../../core";
import {SignUpPayload, SignUpResponse} from "./types";

export const SignUpAPI = {
  signUp: (data: SignUpPayload) => request.post<SignUpResponse>('auth/signup', data),
};