import Block from '../../core/Block';

export class FormError extends Block {
  static componentName = 'FormError';

  protected render(): string {
    // language=hbs
    return `<span class="form-error">{{text}}</span>`
  }
}
