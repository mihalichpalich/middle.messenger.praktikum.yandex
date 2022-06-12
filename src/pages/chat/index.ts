import './chat.scss';
import {renderDOM, registerComponent} from "../../core";
import {ChatPage} from "./chat";
import {ChatListItem, ChatMessage, ChatForm, ChatFormButton, ChatFormInput} from "./components";
import {Avatar, FormError} from "../../components";

registerComponent(ChatListItem);
registerComponent(ChatMessage);
registerComponent(Avatar);
registerComponent(FormError);
registerComponent(ChatForm);
registerComponent(ChatFormButton);
registerComponent(ChatFormInput);

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new ChatPage());
});