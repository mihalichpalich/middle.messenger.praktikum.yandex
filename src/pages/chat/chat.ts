import {Block} from "../../core";

export class ChatPage extends Block {
  static componentName = 'ChatPage';

  render() {
    // language=hbs
    return `
      <main>
        <div class="chat">
          <div class="chat__list-block">
            <nav class="chat__search">
              <button class="chat__search-button chat__search-button--hide"></button>              
              <a href="/settings" alt="Профиль"  class="chat__search-link">
                <button class="chat__search-button chat__search-button--profile"></button>
              </a>
              <input type="text" placeholder="Поиск" class="chat__search-input">
            </nav>
            <ul class="chat-list">
              {{{ChatListItem 
                  avatarSrc="http://www.cherkasyoblenergo.com/uploads/posts/2018-02/1519657152_img_508630.png"
                  name="Наталья"
                  text="отлично! в среду в 14:00 по мск. чуть позже скин ссылку"
                  messageDate="10:19"
                  unread=null
              }}}
              {{{ChatListItem
                  avatarSrc="http://www.cherkasyoblenergo.com/uploads/posts/2018-02/1519657152_img_508630.png"
                  name="Влад"
                  text="ну удачи тогда)"
                  messageDate="Вт"
                  unread=null
              }}}
              {{{ChatListItem
                  avatarSrc="http://www.cherkasyoblenergo.com/uploads/posts/2018-02/1519657152_img_508630.png"
                  name="Лиза"
                  text="Ок, обсудим этот вопрос после майских"
                  messageDate="01.05.2022"
                  unread=null
              }}}
              {{{ChatListItem
                  avatarSrc="http://www.cherkasyoblenergo.com/uploads/posts/2018-02/1519657152_img_508630.png"
                  name="Арина"
                  text="Каеф"
                  messageDate="22.04.2022"
                  unread=3
              }}}
            </ul>
          </div>
          <div class="chat__dialog">
              <nav class="chat__dialog-header">
                <span class="chat__dialog-header-name">Наталья</span>
                <button class="chat__dialog-header-button">
                </button>
              </nav>
              <ul class="chat-messages">
                {{{ChatMessage 
                    text="Михаил, там же праздники)))" 
                    messageDate="29.04.2022 12:23"
                    isOutgoing=false
                    check_sent=false
                    check_read=false
                }}}
                {{{ChatMessage
                    text="так это только понедельник и вторник"
                    messageDate="29.04.2022 12:25"
                    isOutgoing=true
                    check_sent=false
                    check_read=true
                }}}
                {{{ChatMessage
                    text="отлично! в среду в 14:00 по мск. чуть позже скину ссылку на зум)"
                    messageDate="10:19"
                    isOutgoing=false
                    check_sent=false
                    check_read=false
                }}}
              </ul>
              {{{ChatForm}}}
          </div>
        </div>
      </main>
    `;
  }
}