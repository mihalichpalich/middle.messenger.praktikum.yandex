import './profile.scss';
import {renderDOM, registerComponent} from "../../core";
import {ProfilePage} from "./profile";
import {FormHeader, FormInput, FormItem, FormError, Avatar, FormButton} from "../../components";

registerComponent(FormHeader);
registerComponent(FormButton);
registerComponent(FormInput);
registerComponent(FormItem);
registerComponent(FormError);
registerComponent(Avatar);

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new ProfilePage());
});