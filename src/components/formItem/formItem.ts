import {Block} from "@/core";
import {validator} from "@/utils";

interface FormItemProps {
  inputName: string;
  labelName: string;
  value?: string;
  type: string;
  className?: string;
  onBlur?: (e: FocusEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  onInput?: () => void;
}

export class FormItem extends Block<FormItemProps> {
  static componentName = 'FormItem';

  constructor(props: FormItemProps) {
    super({
      onBlur: (e) => this.handleEvent(e),
      onFocus: (e) => this.handleEvent(e),
      onInput: () => {
        this.refs.error.setProps({text: ''});
      },
      ...props
    });
  }

  handleEvent(e: FocusEvent) {
    const input = e.target as HTMLInputElement;
    const value = input.value;
    const errorText = validator(this.props.inputName, value);
    this.refs.error.setProps({text: errorText});
  }

  render() {
    // language=hbs
    return `
      <div class="form-item {{className}}">
        <div class="form-item__main">
          <label for="{{inputName}}" class="form-item__label">{{labelName}}</label>
          {{{FormInput type=type name=inputName onBlur=onBlur onFocus=onFocus onInput=onInput value=value}}}            
        </div>
        {{{FormError ref="error"}}}
      </div>
    `;
  }
}
