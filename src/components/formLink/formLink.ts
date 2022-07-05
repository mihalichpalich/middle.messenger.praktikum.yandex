import {Block} from "../../core";

interface FormLinkProps {
  path: string;
  text: string;
}

export class FormLink extends Block<FormLinkProps> {
  static componentName = 'FormLink';

  constructor({path, text}: FormLinkProps) {
    super({path, text});
  }

  render() {
    // language=hbs
    return `<a href="{{path}}" class="form-link">{{text}}</a>`;
  }
}
