import {BlockClass} from "../core/Block";

import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';
import ProfilePage from '../pages/profile';
import ChatPage from '../pages/chat';
import Error404 from '../pages/error404';
import Error500 from '../pages/error500';

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