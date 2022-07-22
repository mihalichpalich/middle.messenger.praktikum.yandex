import {Block} from "@/core";

interface ChatFormInputProps {
  onInput?: () => void;
  events?: {
    input?: () => void;
  }
}

export class ChatFormInput extends Block<ChatFormInputProps> {
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
