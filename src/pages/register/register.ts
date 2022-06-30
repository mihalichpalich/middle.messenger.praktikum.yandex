import {Block, Router, Store} from "../../core";
import {getFormData} from "../../utils";
import {withRouter} from "../../utils/withRouter";
import {withStore} from "../../utils/withStore";
import {initApp, signUp} from "../../services";
import {SignUpPayload} from "../../api/signUp/types";

interface RegisterPageProps {
  router: Router;
  store: Store<AppState>;
  formError?: () => string | null;
  formLoading?: () => boolean;
}

class RegisterPage extends Block<RegisterPageProps> {
  static componentName = 'RegisterPage';

  constructor(props: RegisterPageProps) {
    super(props);

    this.setProps({
      formError: () => this.props.store.getState().signUpFormError,
      formLoading: () => this.props.store.getState().isSignUpLoading,
    });
  }

  protected getStateFromProps() {
    this.state = {
      onClickButton: (e: MouseEvent) => {
        e.preventDefault();
        const values = getFormData('#register-form') as SignUpPayload;
        if (values) {
          this.props.store.dispatch(signUp, values);
        }
      }
    }
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
            {{{FormError text=formError}}}
            <div class="form__buttons-wrapper">
              {{{FormButton text="Регистрация" onClick=onClickButton isLoading=formLoading}}}
              {{{FormLink path="/" text="Вход"}}}
            </div>
          </form>
        </div>
      </main>
    `;
  }
}

export default withRouter(withStore(RegisterPage));