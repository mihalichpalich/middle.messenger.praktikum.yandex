import './login.scss';
import {renderDOM, registerComponent} from "../../core";
import {LoginPage} from "./login";
import {FormHeader, FormButton, FormLink, FormInput, FormItem, FormError} from "../../components";

registerComponent(FormHeader);
registerComponent(FormButton);
registerComponent(FormLink);
registerComponent(FormInput);
registerComponent(FormItem);
registerComponent(FormError);

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new LoginPage());
});