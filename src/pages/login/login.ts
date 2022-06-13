import {Block} from "../../core";
import {getFormData} from "../../utils";

export class LoginPage extends Block {
  static componentName = 'LoginPage';

  constructor() {
    super({
      onClickButton: (e: MouseEvent) => {
        e.preventDefault();
        getFormData('#auth-form', '/chat.html');
      }
    });
  }

  render() {
    // language=hbs
    return `
      <main>
        <div class="form__wrapper">
          {{{FormHeader title="Авторизация"}}}
          <form class="form" method="post" id="auth-form">
            <div class="form__inputs-wrapper">
              {{{FormItem inputName="login" labelName="Логин" type="text"}}}
              {{{FormItem inputName="password" labelName="Пароль" type="password"}}}
            </div>
            <div class="form__buttons-wrapper">
              {{{FormButton text="Войти" onClick=onClickButton}}}
              {{{FormLink path="./register.html" text="Регистрация"}}}
            </div>
          </form>
        </div> 
      </main>      
    `;
  }
}