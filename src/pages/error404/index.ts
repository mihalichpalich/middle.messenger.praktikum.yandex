import './error404.scss';
import {renderDOM, registerComponent} from "../../core";
import {Error404} from "./error404";
import {ErrorPage} from "../../components";

registerComponent(ErrorPage);

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new Error404());
});