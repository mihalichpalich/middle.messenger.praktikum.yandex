import {Block, Store} from "../../../../core";
import {withStore} from "../../../../utils";

interface ChatListItemProps extends ClickableItemProps {
  store: Store<AppState>;
  avatarSrc: string;
  name: string;
  messageDate: string;
  text: string;
  unread: number | null;
  id: number;
}

class ChatListItem extends Block<ChatListItemProps> {
  static componentName = 'ChatListItem';

  constructor({
    onClick, ...props
  }: ChatListItemProps) {
    super({...props, events: {click: onClick}})
  }

  render() {
    const state = this.props.store.getState();
    const isActive = state.chatId === +this.props.id;

    // language=hbs
    return `
      <li class="chat-list-item ${isActive ? 'chat-list-item--active' : ''}" data-chat-id="{{id}}">
        {{{Avatar avatarSrc=avatarSrc}}}
        <div class="chat-list-item__data">
          <div class="chat-list-item__data-part">
            <span class="chat-list-item__data-name">{{name}}</span>
            <time>{{messageDate}}</time>
          </div>
          <div class="chat-list-item__data-part">
            <span class="chat-list-item__data-text">{{text}}</span>
              ${
                Number(this.props.unread) && !isActive
                  ? `
                      <div class="chat-list-item__data-unread">
                        <span>${this.props.unread}</span>
                      </div>
                    `
                  : ''
              }
          </div>
        </div>
      </li>
    `
  }
}

export default withStore(ChatListItem);

