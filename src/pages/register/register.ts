import {Block} from "../../core";
import {getFormData} from "../../utils";

export class RegisterPage extends Block {
  static componentName = 'RegisterPage';

  constructor() {
    super({
      onClickButton: (e: MouseEvent) => {
        e.preventDefault();
        getFormData('#register-form', '/');
      }
    });
  }

  render() {
    // language=hbs
    return `
      <main>
        <div class="form__wrapper">
          {{{FormHeader title="Регистрация"}}}
          <form class="form" method="post" id="register-form">
            <div class="form__inputs-wrapper">
              {{{FormItem inputName="first_name" labelName="Имя" type="text"}}}
              {{{FormItem inputName="second_name" labelName="Фамилия" type="text"}}}
              {{{FormItem inputName="login" labelName="Логин" type="text"}}}
              {{{FormItem inputName="email" labelName="Email" type="email"}}}
              {{{FormItem inputName="password" labelName="Пароль" type="password"}}}
              {{{FormItem inputName="phone" labelName="Телефон" type="tel"}}}
            </div>
            <div class="form__buttons-wrapper">
              {{{FormButton text="Регистрация" onClick=onClickButton}}}
              {{{FormLink path="/" text="Вход"}}}
            </div>
          </form>
        </div>
      </main>
    `;
  }
}