import './error500.scss';
import {renderDOM, registerComponent} from "../../core";
import {Error500} from "./error500";
import {ErrorPage} from "../../components";

registerComponent(ErrorPage);

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new Error500());
});