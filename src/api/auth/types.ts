export type LoginPayload = {
  login: string;
  password: string;
}

export type UserPayload = {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string | null,
  login: string,
  "avatar": string | null,
  "email": string,
  "phone": string
}