import {Block} from "../../core";
import {getFormData} from "../../utils";

export class ProfilePage extends Block {
  static componentName = 'ProfilePage';

  constructor() {
    super({
      onSave: (e: MouseEvent) => {
        e.preventDefault();
        getFormData('#profile-form', '/messenger');
      },
      onExit: () => {
        location.href = '/';
      }
    });
  }

  render() {
    // language=hbs
    return `
      <main>
        <div class="profile-form__wrapper">
          {{{FormHeader title="Профиль"}}}
          <form enctype="multipart/form-data" method="post" class="avatar-form">
            <label for="avatar" class="form-item__label">Аватар</label>
            <div class="avatar-form__input-block">
              <input type="file" name="avatar" multiple accept="image/*,image/jpeg" class="avatar-form__file-input">
              <div class="avatar-form__image-wrapper">
                {{{Avatar avatarSrc="http://www.cherkasyoblenergo.com/uploads/posts/2018-02/1519657152_img_508630.png"}}}
              </div>
              <input type="submit" value="Добавить аватар" class="avatar-form__button">
            </div>
          </form>
          <form action="#" class="profile-form" method="post" id="profile-form">
            <div class="profile-form__inputs-wrapper">
              {{{FormItem inputName="first_name" labelName="Имя" type="text" className="form-item--row"}}}
              {{{FormItem inputName="second_name" labelName="Фамилия" type="text" className="form-item--row"}}}
              {{{FormItem inputName="display_name" labelName="Имя пользователя" type="text" className="form-item--row"}}}
              {{{FormItem inputName="login" labelName="Логин" type="text" className="form-item--row"}}}
              {{{FormItem inputName="email" labelName="Email" type="email" className="form-item--row"}}}
              {{{FormItem inputName="phone" labelName="Телефон" type="tel" className="form-item--row"}}}
            </div>
            <div class="profile-form__inputs-wrapper">
              {{{FormItem inputName="oldPassword" labelName="Старый пароль" type="password" className="form-item--row"}}}
              {{{FormItem inputName="newPassword" labelName="Новый пароль" type="password" className="form-item--row"}}}
            </div>
            <div class="profile-form__buttons-wrapper">
              {{{FormButton text="Сохранить" onClick=onSave className="form-button--green"}}}
              {{{FormButton text="Выход из приложения" onClick=onExit className="form-button--red" noSubmit=true}}}
            </div>
          </form>
      </main>
    `;
  }
}