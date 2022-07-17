import {Block, Router, Store} from "../../core";
import {getFormData} from "../../utils";
import {withRouter} from "../../utils/withRouter";
import {withStore} from "../../utils/withStore";
import {signUp} from "../../services";
import {SignUpPayload} from "../../api/signUp/types";

interface RegisterPageProps {
  router: Router;
  store: Store<AppState>;
  dispatch: Dispatch<AppState>;
  formError?: string | null;
  formLoading?: boolean;
}

class RegisterPage extends Block<RegisterPageProps> {
  static componentName = 'RegisterPage';

  constructor(props: RegisterPageProps) {
    super(props);
  }

  protected getStateFromProps() {
    this.state = {
      onSignUp: (e: MouseEvent) => {
        e.preventDefault();
        const values = getFormData('#register-form') as SignUpPayload;
        if (values) {
          this.props.dispatch(signUp, values);
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
              {{{FormButton text="Регистрация" onClick=onSignUp isLoading=formLoading}}}
              {{{FormLink path="/" text="Вход"}}}
            </div>
          </form>
        </div>
      </main>
    `;
  }
}

function mapStateToProps(state: AppState) {
  return {
    formError: state.signUpFormError,
    formLoading: state.isSignUpLoading,
  };
}

export default withRouter(withStore(RegisterPage, mapStateToProps));