import {Block, Router, Store} from "@/core";
import {withRouter} from "@/utils/withRouter";
import {withStore} from "@/utils/withStore";
import {getChatList, getChatData, initApp, addChat, userSearch} from "@/services";

interface ChatProps {
  router: Router;
  store: Store<AppState>;
  dispatch: Dispatch<AppState>;
  chatList: ChatListItemData[];
  isChatListLoading: boolean;
  isAddChatFormOpened: boolean;
  isAddUserFormOpened: boolean;
  chatId: number | null;
  chatMessages: ChatMessage[];
  chatUsers: string[];
}

class ChatPage extends Block<ChatProps> {
  static componentName = 'ChatPage';

  constructor(props: ChatProps) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(initApp);
    this.props.dispatch(getChatList);
  }

  getStateFromProps() {
    this.state = {
      onAddChatOpen: () => {
        this.props.dispatch({isAddChatFormOpened: true});
      },
      onAddUserOpen: () => {
        this.props.dispatch({isAddUserFormOpened: true});
      },
      onAddChat: () => {
        const input = this.element?.querySelector(`[name="add-chat"]`) as HTMLInputElement;
        const inputText = input.value;
        if (inputText) {
          this.props.dispatch(addChat, inputText);
          this.props.dispatch({isAddChatFormOpened: false});
        }
      },
      onChatPick: (e: FocusEvent) => {
        this.props.dispatch({isChatListLoading: true});
        const element = e.currentTarget as Element;
        const chatId = element.getAttribute('data-chat-id');
        this.props.dispatch(getChatData, chatId);
      },
      onAddUser: () => {
        const input = this.element?.querySelector(`[name="add-user"]`) as HTMLInputElement;
        const inputText = input.value;
        this.props.dispatch(userSearch, inputText);
        this.props.dispatch({isAddUserFormOpened: false});
      }
    }
  }

  render() {
    // language=hbs
    return `
      <main>
        <div class="chat">
          <div class="chat__list-block">
            <nav class="chat__search">
              <a href="/settings" alt="??????????????"  class="chat__search-link">
                {{{ChatFeatureOpenButton buttonType="profile"}}}
              </a>
              {{{ChatFeatureOpenButton buttonType="add-chat" onClick=onAddChatOpen}}}
              <input type="text" placeholder="??????????" class="chat__search-input">
            </nav>
            {{#if isAddChatFormOpened}}
              {{{ChatFeatureForm 
                  inputName="add-chat" 
                  buttonText="???????????????? ??????" 
                  placeholder="?????????????? ???????????????? ????????"
                  onClick=onAddChat
              }}}
            {{/if}}
            {{#if isAddUserFormOpened}}
              {{{ChatFeatureForm 
                  inputName="add-user" 
                  buttonText="???????????????? ??????????????????????" 
                  onClick=onAddUser
                  placeholder="?????????????? ?????????? ??????????????????????"                  
              }}}
            {{/if}}           
            <ul class="chat-list">
              {{#if isChatListLoading}}
                <span class="chat-list__loading">????????????????...</span>
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
                {{#unless isChatListLoading}}
                  <span class="chat__dialog-header-name">${this.props.chatUsers.join(', ')}</span>
                  {{#if chatId}}
                    <div class="chat__dialog-header-button-block">                    
                      {{{ChatFeatureOpenButton buttonType="add-user" onClick=onAddUserOpen}}}                    
                      {{{ChatFeatureOpenButton buttonType="remove-user"}}}
                    </div>
                  {{/if}}
                {{/unless}}         
              </nav>
              <ul class="chat-messages">
                {{#unless isChatListLoading}}
                    {{#if chatId}}
                        {{#each chatMessages}}
                          {{{ChatMessage text=text messageDate=time userId=userId}}}
                        {{/each}}
                      {{else}} 
                        {{{ChatInfoMessage text="????????????????, ???????? ???????????? ???? ????????????????"}}}
                    {{/if}}  
                  {{else}}
                    {{{ChatInfoMessage text="????????????????..."}}}
                {{/unless}}
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

function mapStateToProps(state: AppState) {
  return {
    chatList: state.chatList,
    isChatListLoading: state.isChatListLoading,
    isAddChatFormOpened: state.isAddChatFormOpened,
    isAddUserFormOpened: state.isAddUserFormOpened,
    chatId: state.chatId,
    chatMessages: state.chatMessages,
    chatUsers: state.chatUsers
  };
}

export default withRouter(withStore(ChatPage, mapStateToProps));