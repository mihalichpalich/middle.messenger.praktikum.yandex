import {validator} from "./validator";

export function getFormData (formSelector: string, redirectUrl?: string) {
  const form = document.querySelector(formSelector) as HTMLInputElement;
  const formItems = form.querySelectorAll('.form-item');
  const formValues: Record<string, string> = {};

  formItems.forEach((item) => {
    const input = item.querySelector('input') as HTMLInputElement;
    const errorText = validator(input.name, input.value);

    if (errorText) {
      const error = item.querySelector('.form-error') as HTMLInputElement;
      error.textContent = errorText;
    } else {
      formValues[input.name] = input.value;
    }
  });

  if (Object.keys(formValues).length === formItems.length) {
    console.log(formValues);
    if (redirectUrl) {
      location.href = redirectUrl;
    }
  }
}