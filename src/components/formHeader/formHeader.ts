import {Block} from "@/core";

interface FormHeaderProps {
  title: string;
}

export class FormHeader extends Block<FormHeaderProps> {
  static componentName = 'FormHeader';

  constructor({title}: FormHeaderProps) {
    super({title});
  }

  render() {
    // language=hbs
    return `<h1 class="form-header">{{title}}</h1>`;
  }
}
