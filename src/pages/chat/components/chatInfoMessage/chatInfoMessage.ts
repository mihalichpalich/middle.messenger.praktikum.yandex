import {Block} from '@/core';

interface ChatInfoMessageProps {
  text: string;
}

export class ChatInfoMessage extends Block<ChatInfoMessageProps> {
  static componentName = 'ChatInfoMessage';

  constructor(props: ChatInfoMessageProps) {
    super(props);
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="chat-info-message">
        <span class="chat-info-message__text">{{text}}</span>
      </div>
    `;
  }
}
