import {Block} from "../../../../core";

interface ChatFormButtonProps {
  onClick?: () => void;
  events?: {
    click?: () => void;
  };
}

export class ChatFormButton extends Block<ChatFormButtonProps> {
  static componentName = 'ChatSendButton';

  constructor({onClick}: ChatFormButtonProps) {
    super({events: {click: onClick}});
  }

  render() {
    // language=hbs
    return `
      <button class="chat-form-button"></button>
    `;
  }
}