import {Block} from "../../core";

interface FormButtonProps {
  type: string;
  name: string;
  onBlur: (e: FocusEvent) => void;
  onFocus: (e: FocusEvent) => void;
  onInput: () => void;
}

export class FormInput extends Block {
  static componentName = 'FormInput';

  constructor({
    onBlur,
    onFocus,
    onInput,
    ...props
  }: FormButtonProps) {
    super({...props, events: {blur: onBlur, focus: onFocus, input: onInput}});
  }

  render() {
    // language=hbs
    return `<input class="form-input" type="{{type}}" name="{{name}}" value="{{value}}">`;
  }
}
