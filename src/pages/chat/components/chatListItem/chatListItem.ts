import {Block} from "../../../../core";

interface ChatListItemProps {
  avatarSrc: string;
  name: string;
  messageDate: string;
  text: string;
  unread: number | null;
}

export class ChatListItem extends Block<ChatListItemProps> {
  static componentName = 'ChatListItem';

  constructor({avatarSrc, name, messageDate, text, unread}: ChatListItemProps) {
    super({avatarSrc, name, messageDate, text, unread})
  }

  render() {
    // language=hbs
    return `
      <li class="chat-list-item">
        {{{Avatar avatarSrc=avatarSrc}}}
        <div class="chat-list-item__data">
          <div class="chat-list-item__data-part">
            <span class="chat-list-item__data-name">{{name}}</span>
            <time>{{messageDate}}</time>
          </div>
          <div class="chat-list-item__data-part">
            <span class="chat-list-item__data-text">{{text}}</span>
            {{#if unread}}
              <div class="chat-list-item__data-unread">
                <span>{{unread}}</span>
              </div>
            {{/if}}
          </div>
        </div>
      </li>
    `
  }
}