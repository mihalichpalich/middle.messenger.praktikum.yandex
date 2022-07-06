import {Block, Router, Store} from "../../core";
import {getFormData} from "../../utils";
import {withRouter} from "../../utils/withRouter";
import {withStore} from "../../utils/withStore";
import {login, initApp} from "../../services";
import {LoginPayload} from "../../api/auth/types";

interface LoginPageProps {
  router: Router;
  store: Store<AppState>;
  formError?: () => string | null;
  formLoading?: () => boolean;
}

class LoginPage extends Block<LoginPageProps> {
  static componentName = 'LoginPage';

  constructor(props: LoginPageProps) {
    super({
      ...props,
      formError: () => props.store.getState().loginFormError,
      formLoading: () => props.store.getState().isAuthLoading,
    });
  }

  componentDidMount() {
    this.props.store.dispatch(initApp);
  }

  protected getStateFromProps() {
    this.state = {
      onClickButton: (e: MouseEvent) => {
        e.preventDefault();
        const values = getFormData('#auth-form') as LoginPayload;
        if (values) {
          this.props.store.dispatch(login, values);
        }
      }
    }
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
            {{{FormError text=formError}}}
            <div class="form__buttons-wrapper">
              {{{FormButton text="Войти" onClick=onClickButton isLoading=formLoading}}}
              {{{FormLink path="/sign-up" text="Регистрация"}}}
            </div>
          </form>
        </div> 
      </main>      
    `;
  }
}

export default withRouter(withStore(LoginPage));