export enum ValidationRule {
  FirstName = 'first_name',
  SecondName = 'second_name',
  Login = 'login',
  Email = 'email',
  Password = 'password',
  OldPassword = 'oldPassword',
  NewPassword = 'newPassword',
  Phone = 'phone',
  Message = 'message'
}

const REGEXPS = {
  login: /^(?=.*[a-zA-Z])([a-zA-Z\d_-]+){3,20}$/,
  name: /^[A-ZА-Я][A-ZА-яa-zа-я-]+$/,
  email: /^[a-zA-Z\d!@#\$%\^\&*\)\(+=._-]+[@][a-zA-Z\d!@#\$%\^\&*\)\(+=._-]+[.][a-zA-Z\d!@#\$%\^\&*\)\(+=._-]+/,
  password: /(?=.*\d)(?=.*[A-ZА-Я])[А-Яа-я\w\d\s!@#\$%\^\&*\)\(+=._-]{8,40}$/,
  phone: /^([+]{1})?[0-9]{10,15}$/
};

export function validator(rule: string, value: string) {
  if (rule === ValidationRule.Login && !REGEXPS.login.test(value)) {
    return 'Должен быть длиной 3-20 символов и может содержать латиницу, цифры (но не состоять из них), а также символы - и _';
  } else if ((rule === ValidationRule.FirstName || rule === ValidationRule.SecondName) && !REGEXPS.name.test(value)) {
    return 'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только -)';
  } else if (rule === ValidationRule.Email && !REGEXPS.email.test(value)) {
    return 'Только латиница, обязательно @ и символы между @ и . и после ., допускаются цифры и символы !@#$%^&*)(+=._- ';
  } else if (
      (rule === ValidationRule.Password || rule === ValidationRule.OldPassword || rule === ValidationRule.NewPassword)
        && !REGEXPS.password.test(value)
    ) {
    return 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра';
  } else if (rule === ValidationRule.Phone && !REGEXPS.phone.test(value)) {
    return 'От 10 до 15 символов, состоит из цифр, может начинается с +';
  } else if (rule === ValidationRule.Message && !value) {
    return 'Сообщение не должно быть пустым';
  }
  return '';
}