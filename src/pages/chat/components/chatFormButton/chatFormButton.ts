import {Block} from "../../../../core";

interface ChatSendButtonProps {
  onClick: () => void;
}

export class ChatFormButton extends Block {
  static componentName = 'ChatSendButton';

  constructor({onClick}: ChatSendButtonProps) {
    super({events: {click: onClick}});
  }

  render() {
    // language=hbs
    return `
      <button class="chat-form-button"></button>
    `;
  }
}