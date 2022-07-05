import {BlockClass} from "../core/Block";

import {LoginPage, RegisterPage, ChatPage, ProfilePage, Error404, Error500} from '../pages';

export enum Screens {
  Login = 'login',
  SignUp = 'sign-up',
  Profile = 'settings',
  Chat = 'messenger',
  Error404 = 'error404',
  Error500 = 'error500'
}

const map: Record<Screens, BlockClass<any>> = {
  [Screens.Login]: LoginPage,
  [Screens.SignUp]: RegisterPage,
  [Screens.Profile]: ProfilePage,
  [Screens.Chat]: ChatPage,
  [Screens.Error404]: Error404,
  [Screens.Error500]: Error500,
};

export const getScreenComponent = (screen: Screens): BlockClass<any> => {
  return map[screen];
};