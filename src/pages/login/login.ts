import {Block, Router, Store} from "../../core";
import {getFormData} from "../../utils";
import {withRouter} from "../../utils/withRouter";
import {withStore} from "../../utils/withStore";
import {initApp} from "../../services";

interface LoginPageProps {
  router: Router;
  store: Store<AppState>;
  formError?: () => string | null;
}

class LoginPage extends Block<LoginPageProps> {
  static componentName = 'LoginPage';

  constructor(props: LoginPageProps) {
    super(props);
  }

  componentDidMount() {
    this.props.store.dispatch(initApp);
  }

  protected getStateFromProps() {
    this.state = {
      onClickButton: (e: MouseEvent) => {
        e.preventDefault();
        getFormData('#auth-form', '/messenger');
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
            <div class="form__buttons-wrapper">
              {{{FormButton text="Войти" onClick=onClickButton}}}
              {{{FormLink path="/sign-up" text="Регистрация"}}}
            </div>
          </form>
        </div> 
      </main>      
    `;
  }
}

export default withRouter(withStore(LoginPage));