import {Block} from "@/core";

interface ChatFeatureSendButtonProps extends ClickableItemProps {
  buttonText: string;
}

export class ChatFeatureSendButton extends Block<ChatFeatureSendButtonProps> {
  static componentName = 'ChatFeatureSendButton';

  constructor({onClick, ...props}: ChatFeatureSendButtonProps) {
    super({...props, events: {click: onClick}});
  }

  render() {
    // language=hbs
    return `
      <button class="chat-feature-form-button" type="submit">{{buttonText}}</button>
    `
  }
}