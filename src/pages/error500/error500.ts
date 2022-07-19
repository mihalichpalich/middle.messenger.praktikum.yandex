import {Block} from "@/core";

export default class Error500 extends Block {
  static componentName = 'Error500';

  render() {
    // language=hbs
    return `
      <main>
        {{{ErrorPage number=500 descr="Описание"}}}
      </main>      
    `;
  }
}