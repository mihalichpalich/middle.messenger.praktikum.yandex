import {Block} from "../../core";

interface FormButtonProps extends ClickableItemProps {
  text: string;
  className?: string;
  noSubmit?: boolean;
  isLoading?: boolean;
}

export class FormButton extends Block<FormButtonProps> {
  static componentName = 'FormButton';

  constructor({onClick, ...props}: FormButtonProps) {
    super({events: {click: onClick}, ...props});
  }

  render() {
    // language=hbs
    return `
      <button 
        {{#if isLoading}}disabled{{/if}} 
        class="form-button {{className}} {{#if isLoading}}form-button--disabled{{/if}}" 
        {{#if noSubmit}}type="button"{{else}}type="submit"{{/if}}
      >
        <span class="form-button__link">{{text}}</span>
      </button>
    `;
  }
}
