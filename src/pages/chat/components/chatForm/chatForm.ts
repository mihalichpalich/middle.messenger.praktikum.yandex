import {Block} from "../../../../core";

export class ChatForm extends Block {
  static componentName = 'ChatForm';

  constructor() {
    super({
      onClickButton: () => {
        const messageText = (this.element?.querySelector('[name="message"]') as HTMLInputElement).value;
        if (!messageText) {
          this.refs.error.setProps({text: "Сообщение не должно быть пустым!"});
        }
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