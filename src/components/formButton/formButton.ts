import {Block} from "../../core";

interface FormButtonProps {
  text: string;
  className?: string;
  onClick: () => void;
  noSubmit?: boolean;
}

export class FormButton extends Block {
  static componentName = 'FormButton';

  constructor({text, className, onClick, noSubmit}: FormButtonProps) {
    super({text, className, noSubmit, events: {click: onClick}});
  }

  render() {
    // language=hbs
    return `
      <button class="form-button {{className}}" {{#if noSubmit}}type="button"{{else}}type="submit"{{/if}}>
        <span class="form-button__link">{{text}}</span>
      </button>
    `;
  }
}
