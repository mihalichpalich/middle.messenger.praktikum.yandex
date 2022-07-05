import {Block} from "../../core";

interface FormInputProps {
  type: string;
  name: string;
  value?: string;
  onBlur?: (e: FocusEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  onInput?: () => void;
  events?: {
    blur?: (e: FocusEvent) => void;
    focus?: (e: FocusEvent) => void;
    input?: () => void;
  }
}

export class FormInput extends Block<FormInputProps> {
  static componentName = 'FormInput';

  constructor({
    onBlur,
    onFocus,
    onInput,
    ...props
  }: FormInputProps) {
    super({...props, events: {blur: onBlur, focus: onFocus, input: onInput}});
  }

  render() {
    // language=hbs
    return `<input class="form-input" type="{{type}}" id="{{name}}" name="{{name}}" value="{{value}}">`;
  }
}
