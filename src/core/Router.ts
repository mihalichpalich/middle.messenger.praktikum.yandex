import Block from './Block';
import renderDOM from "./renderDOM";
import {BlockClass} from "./Block";

class Route {
  private _pathname: string;
  private readonly _blockClass: BlockClass<any>;
  private _block: Block | null;

  constructor(pathname: string, view: BlockClass<any>) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      renderDOM(this._block as Block);
      return;
    }

    this._block.show();
  }
}

export default class Router {
  static __instance: Router;
  public routes: Route[] = [];
  public history: History = window.history;
  private _currentRoute: Route | null = null;

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    Router.__instance = this;
  }

  use(pathname: string, block: BlockClass<any>) {
    const route = new Route(pathname, block);
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    const router = this.routes.find(route => route.match(pathname));
    const pageNotFound = this.routes.find(route => route.match('*'))
    return router || pageNotFound;
  }
}