import {Block} from "../../../../core";

export class ChatFormButton extends Block<ClickableItemProps> {
  static componentName = 'ChatSendButton';

  constructor({onClick}: ClickableItemProps) {
    super({events: {click: onClick}});
  }

  render() {
    // language=hbs
    return `
      <button class="chat-form-button"></button>
    `;
  }
}