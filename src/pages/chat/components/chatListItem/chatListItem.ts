import {Block, Store} from "../../../../core";
import {withStore} from "../../../../utils";
import {getChatUsers, getChatToken} from "../../../../services";

interface ChatListItemProps {
  store: Store<AppState>;
  avatarSrc: string;
  name: string;
  messageDate: string;
  text: string;
  unread: number | null;
  id: number;
  events?: {
    click?: (e: FocusEvent) => void;
  };
}

class ChatListItem extends Block<ChatListItemProps> {
  static componentName = 'ChatListItem';

  constructor({
    ...props
  }: ChatListItemProps) {
    async function onChatPick(e: FocusEvent) {
      const element = e.currentTarget;
      const chatId = Number((<Element>element).id);
      await props.store.dispatch({chatId});
      await props.store.dispatch(getChatUsers, chatId);
      await props.store.dispatch(getChatToken, chatId);
    }
    super({...props, events: {click: onChatPick}})
  }

  render() {
    const state = this.props.store.getState();
    const isActive = state.chatId === +this.props.id;

    // language=hbs
    return `
      <li class="chat-list-item ${isActive ? 'chat-list-item--active' : ''}" id="{{id}}">
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

