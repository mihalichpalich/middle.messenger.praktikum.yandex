import {Block} from "../../../../core";

interface ChatFeatureOpenButtonProps extends ClickableItemProps {
  buttonType: string;
}

export class ChatFeatureOpenButton extends Block<ChatFeatureOpenButtonProps> {
  static componentName = 'ChatFeatureOpenButton';

  constructor({onClick, ...props}: ChatFeatureOpenButtonProps) {
    super({...props, events: {click: onClick}});
  }

  render() {
    // language=hbs
    return `
      <button class="chat-feature-open-button chat-feature-open-button--{{{buttonType}}}"></button>
    `
  }
}