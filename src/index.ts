import './styles/index.scss';
import {registerComponent} from "./core";
import {Router} from "./core";

import {Avatar, ErrorPage, FormButton, FormError, FormHeader, FormInput, FormItem, FormLink} from "./components";
import {ChatForm, ChatFormButton, ChatFormInput, ChatListItem, ChatMessage} from "./pages/chat/components";
import {ChatPage, Error404, ProfilePage, RegisterPage, LoginPage, Error500} from "./pages";

registerComponent(Avatar);
registerComponent(ErrorPage);
registerComponent(FormButton);
registerComponent(FormError);
registerComponent(FormHeader);
registerComponent(FormInput);
registerComponent(FormItem);
registerComponent(FormLink);
registerComponent(ChatForm);
registerComponent(ChatFormButton);
registerComponent(ChatFormInput);
registerComponent(ChatListItem);
registerComponent(ChatMessage);

const router = new Router();

router
  .use('/', LoginPage)
  .use('/sign-up', RegisterPage)
  .use('/settings', ProfilePage)
  .use('/messenger', ChatPage)
  .use('/error404', Error404)
  .use('/error500', Error500)
  .start();





