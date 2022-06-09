import {Block} from "../../core";
import {validator} from "../../utils";

interface FormItemProps {
  inputName: string;
  labelName: string;
  type: string;
  className?: string;
}

export class FormItem extends Block {
  static componentName = 'FormItem';

  constructor({type, inputName, labelName, className}: FormItemProps) {
    super({
      type,
      inputName,
      labelName,
      className,
      onBlur: (e: FocusEvent) => {
        const input = e.target as HTMLInputElement;
        const value = input.value;
        const errorText = validator(inputName, value);
        this.refs.error.setProps({text: errorText});
      },
      onFocus: (e: FocusEvent) => {
        const input = e.target as HTMLInputElement;
        const value = input.value;
        const errorText = validator(inputName, value);
        this.refs.error.setProps({text: errorText});
      },
      onInput: () => {
        this.refs.error.setProps({text: ''});
      }
    });
  }

  render() {
    // language=hbs
    return `
      <div class="form-item {{className}}">
        <div class="form-item__main">
          <label for="{{inputName}}" class="form-item__label">{{labelName}}</label>
          {{{FormInput type=type name=inputName onBlur=onBlur onFocus=onFocus onInput=onInput}}}            
        </div>
        {{{FormError ref="error"}}}
      </div>
    `;
  }
}
