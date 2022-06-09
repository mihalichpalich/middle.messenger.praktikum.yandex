import {Block} from "../../core";

interface FormButtonProps {
  text: string;
  className?: string;
  onClick: () => void;
}

export class FormButton extends Block {
  static componentName = 'FormButton';

  constructor({text, className, onClick}: FormButtonProps) {
    super({text, className, events: {click: onClick}});
  }

  render() {
    // language=hbs
    return `
      <button class="form-button {{className}}" type="submit">
        <span class="form-button__link">{{text}}</span>
      </button>
    `;
  }
}
