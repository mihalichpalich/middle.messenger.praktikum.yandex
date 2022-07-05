export type ProfilePayload = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export type PasswordPayload = {
  oldPassword: string;
  newPassword: string;
}