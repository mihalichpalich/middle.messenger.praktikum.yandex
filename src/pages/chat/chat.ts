import {Block, Router, Store} from "../../core";
import {withRouter} from "../../utils/withRouter";
import {withStore} from "../../utils/withStore";
import {getChatList, initApp} from "../../services";

interface ChatProps {
  router: Router;
  store: Store<AppState>;
}

class ChatPage extends Block<ChatProps> {
  static componentName = 'ChatPage';

  constructor(props: ChatProps) {
    super(props);
  }

  componentDidMount() {
    this.props.store.dispatch(initApp);
    this.props.store.dispatch(getChatList);
  }

  render() {
    const state = this.props.store.getState();

    // language=hbs
    return `
      <main>
        <div class="chat">
          <div class="chat__list-block">
            <nav class="chat__search">
              <a href="/settings" alt="Профиль"  class="chat__search-link">
                <button class="chat__search-button chat__search-button--profile"></button>
              </a>
              <button class="chat__search-button chat__search-button--add"></button>
              <input type="text" placeholder="Поиск" class="chat__search-input">
            </nav>
            <ul class="chat-list">
              ${
                state.chatList.map((chat) => `
                  {{{ChatListItem 
                    avatarSrc="${process.env.IMG_ENDPOINT}${chat.chatAvatar}"
                    name="${chat.title}"
                    text="${chat.text}"
                    messageDate="${chat.time}"
                    unread="${chat.unreadCount}"
                    id="${chat.id}"
                  }}}
                `).join('')
              }
            </ul>
          </div>
          <div class="chat__dialog">
              <nav class="chat__dialog-header">
                <span class="chat__dialog-header-name">${state.chatUsers.join(', ')}</span>
                ${
                  state.chatId 
                    ? `
                        <div class="chat__dialog-header-button-block">
                          <button class="chat__dialog-header-button chat__dialog-header-button--add-user"></button>
                          <button class="chat__dialog-header-button chat__dialog-header-button--remove-user"></button>                
                        </div>
                      `
                    : ''
                }                
              </nav>
              <ul class="chat-messages">
                ${
                  !state.chatId
                    ? `
                        <div class="chat-messages__chat-not-chosen">
                          <span class="chat-messages__chat-not-chosen-text">Выберите, кому хотели бы написать</span>
                        </div>
                      `
                    : ''
                }
                ${
                  state.chatMessages 
                    ? state.chatMessages.map((message) => `
                        {{{ChatMessage text="${message.text}" messageDate="${message.time}" userId="${message.userId}"}}}
                      `).join('')
                    : ''
                }                
              </ul>
              ${state.chatId ? `{{{ChatForm}}}` : ''}              
          </div>
        </div>
      </main>
    `;
  }
}

export default withRouter(withStore(ChatPage));