import {Block} from "../../core";

export default class Error404 extends Block {
  static componentName = 'Error404';

  render() {
    // language=hbs
    return `
      <main>
        {{{ErrorPage number=404 descr="Описание"}}}
      </main>      
    `;
  }
}