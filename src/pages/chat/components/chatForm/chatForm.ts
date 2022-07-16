import {Block, WS} from "../../../../core";

interface ChatFormProps {
  onClickButton: () => void;
  onInput: () => void;
}

class ChatForm extends Block<ChatFormProps> {
  static componentName = 'ChatForm';

  constructor(props: ChatFormProps) {
    super({
      ...props,
      onClickButton: () => {
        const socket = new WS();
        const input = this.element?.querySelector('[name="message"]') as HTMLInputElement;
        const messageText = input.value;

        if (!messageText) {
          this.refs.error.setProps({text: "Сообщение не должно быть пустым!"});
        } else {
          socket.sendMessage(messageText);
        }

        input.value = '';
      },
      onInput: () => {
        this.refs.error.setProps({text: ''});
      }
    });
  }

  render() {
    // language=hbs
    return `
      <div class="chat-form">
        <div class="chat-form__field">
          {{{ChatFormInput onInput=onInput}}}
          {{{FormError ref="error"}}}
        </div>
        {{{ChatSendButton onClick=onClickButton}}}
      </div>      
    `;
  }
}

export default ChatForm;