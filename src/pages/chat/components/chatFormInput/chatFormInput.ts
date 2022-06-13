import {Block} from "../../../../core";

interface ChatFormInputProps {
  onInput: () => void;
}

export class ChatFormInput extends Block {
  static componentName = 'ChatFormInput';

  constructor({onInput}: ChatFormInputProps) {
    super({events: {input: onInput}});
  }

  render() {
    // language=hbs
    return `
      <input type="text" class="chat-form-input" name="message" placeholder="Написать сообщение..." value="{{value}}">
    `;
  }
}
