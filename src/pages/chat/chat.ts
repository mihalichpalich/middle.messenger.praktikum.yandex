import {Block, Router, Store} from "../../core";
import {withRouter} from "../../utils/withRouter";
import {withStore} from "../../utils/withStore";
import {getChatList, getChatData, initApp, addChat, userSearch} from "../../services";

interface ChatProps {
  router: Router;
  store: Store<AppState>;
  chatList: () => ChatListItemData[];
  isChatListLoading: () => boolean;
  isAddChatFormOpened: () => boolean;
  isAddUserFormOpened: () => boolean;
  chatId: () => number | null;
  chatMessages: () => ChatMessage[];
}

class ChatPage extends Block<ChatProps> {
  static componentName = 'ChatPage';

  constructor(props: ChatProps) {
    super({
      ...props,
      chatList: () => props.store.getState().chatList,
      isChatListLoading: () => props.store.getState().isChatListLoading,
      isAddChatFormOpened: () => props.store.getState().isAddChatFormOpened,
      isAddUserFormOpened: () => props.store.getState().isAddUserFormOpened,
      chatId: () => props.store.getState().chatId,
      chatMessages: () => props.store.getState().chatMessages,
    });
  }

  componentDidMount() {
    this.props.store.dispatch(initApp);
    this.props.store.dispatch(getChatList);
  }

  getStateFromProps() {
    this.state = {
      onAddChatOpen: () => {
        this.props.store.dispatch({isAddChatFormOpened: true});
      },
      onAddUserOpen: () => {
        this.props.store.dispatch({isAddUserFormOpened: true});
      },
      onAddChat: () => {
        const input = this.element?.querySelector(`[name="add-chat"]`) as HTMLInputElement;
        const inputText = input.value;
        if (inputText) {
          this.props.store.dispatch(addChat, inputText);
          this.props.store.dispatch({isAddChatFormOpened: false});
        }
      },
      onChatPick: (e: FocusEvent) => {
        this.props.store.dispatch({isChatListLoading: true});
        const element = e.currentTarget as Element;
        const chatId = element.getAttribute('data-chat-id');
        this.props.store.dispatch(getChatData, chatId);
      },
      onAddUser: () => {
        const input = this.element?.querySelector(`[name="add-user"]`) as HTMLInputElement;
        const inputText = input.value;
        this.props.store.dispatch(userSearch, inputText);
        this.props.store.dispatch({isAddUserFormOpened: false});
      }
    }
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
                {{{ChatFeatureOpenButton buttonType="profile"}}}
              </a>
              {{{ChatFeatureOpenButton buttonType="add-chat" onClick=onAddChatOpen}}}
              <input type="text" placeholder="Поиск" class="chat__search-input">
            </nav>
            {{#if isAddChatFormOpened}}
              {{{ChatFeatureForm 
                  inputName="add-chat" 
                  buttonText="Добавить чат" 
                  placeholder="Введите название чата"
                  onClick=onAddChat
              }}}
            {{/if}}
            {{#if isAddUserFormOpened}}
              {{{ChatFeatureForm 
                  inputName="add-user" 
                  buttonText="Добавить собеседника" 
                  onClick=onAddUser
                  placeholder="Введите логин собеседника"                  
              }}}
            {{/if}}           
            <ul class="chat-list">
              {{#if isChatListLoading}}
                <span class="chat-list__loading">Загрузка...</span>
              {{else}}
                {{#each chatList}}
                  {{{ChatListItem
                    avatarSrc=chatAvatar
                    name=title
                    text=text
                    messageDate=time
                    unread=unreadCount
                    id=id
                    onClick=@root.onChatPick
                  }}}
                {{/each}}
              {{/if}}
            </ul>
          </div>
          <div class="chat__dialog">
              <nav class="chat__dialog-header">
                <span class="chat__dialog-header-name">${state.chatUsers.join(', ')}</span>
                {{#if chatId}}
                  <div class="chat__dialog-header-button-block">                    
                    {{{ChatFeatureOpenButton buttonType="add-user" onClick=onAddUserOpen}}}                    
                    {{{ChatFeatureOpenButton buttonType="remove-user"}}}
                  </div>
                {{/if}}        
              </nav>
              <ul class="chat-messages">
                {{#if chatId}}
                    {{#each chatMessages}}
                      {{{ChatMessage
                        text=text
                        messageDate=time
                        userId=userId
                      }}}
                    {{/each}}
                  {{else}} 
                    <div class="chat-messages__chat-not-chosen">
                      <span class="chat-messages__chat-not-chosen-text">Выберите, кому хотели бы написать</span>
                    </div>
                {{/if}}  
              </ul>
              {{#if chatId}}
                {{{ChatForm}}}
              {{/if}}          
          </div>
        </div>
      </main>
    `;
  }
}

export default withRouter(withStore(ChatPage));