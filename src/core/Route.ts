import {Block, BlockClass} from "./Block";
import {renderDOM} from "./renderDOM";

export default class Route {
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