import {Block} from "@/core";

interface ErrorPageProps {
  number: number;
  descr: string;
}

export class ErrorPage extends Block<ErrorPageProps> {
  static componentName = 'ErrorPage';

  constructor({number, descr}: ErrorPageProps) {
    super({number, descr});
  }

  render() {
    // language=hbs
    return `
      <div class="error">
        <div class="error__wrapper">
          <h1 class="error__name">Ошибка {{number}}</h1>
          <p class="error__descr">{{descr}}</p>
        </div>
      </div>
    `;
  }
}
