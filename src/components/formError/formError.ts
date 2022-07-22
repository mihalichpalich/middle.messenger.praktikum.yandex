import {Block} from '@/core';

interface FormErrorProps {
  text: string | null;
}

export class FormError extends Block<FormErrorProps> {
  static componentName = 'FormError';

  constructor(props: FormErrorProps) {
    super(props);
  }

  protected render(): string {
    // language=hbs
    return `<span class="form-error">{{text}}</span>`
  }
}
