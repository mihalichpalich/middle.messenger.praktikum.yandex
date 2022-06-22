import {Block} from "../../../../core";

interface ChatMessageProps {
  text: string;
  messageDate: string;
  isOutgoing: boolean;
  check_sent: boolean;
  check_read: boolean;
}

export class ChatMessage extends Block<ChatMessageProps> {
  static componentName = 'ChatMessage';

  constructor({
    text,
    messageDate,
    isOutgoing,
    check_sent,
    check_read
  }: ChatMessageProps) {
    super({text, messageDate, isOutgoing, check_sent, check_read})
  }

  render() {
    // language=hbs
    return `
      <li class="chat-message{{#if isOutgoing}} chat-message--my{{/if}}">
        <p class="chat-message__text">{{text}}</p>
        <time class="chat-message__date">{{messageDate}}</time>
        {{#if check_sent}}
          <span class="chat-message__status chat-message__status--sent"></span>
        {{/if}}
        {{#if check_read}}
          <span class="chat-message__status chat-message__status--read"></span>
        {{/if}}
      </li>
    `
  }
}