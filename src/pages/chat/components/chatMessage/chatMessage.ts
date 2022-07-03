import {Block, Store} from "../../../../core";
import {withStore} from "../../../../utils";

interface ChatMessageProps {
  store: Store<AppState>;
  text: string;
  messageDate: string;
  userId: string;
  isOutgoing?: boolean;
}

class ChatMessage extends Block<ChatMessageProps> {
  static componentName = 'ChatMessage';

  constructor(props: ChatMessageProps) {
    super(props);


    this.setProps({
      isOutgoing: props.userId === this.props.store.getState().user?.id.toString()
    });
  }

  render() {
    // language=hbs
    return `
      <li class="chat-message{{#if isOutgoing}} chat-message--my{{/if}}">
        <p class="chat-message__text">{{text}}</p>
        <time class="chat-message__date">{{messageDate}}</time>
      </li>
    `
  }
}

export default withStore(ChatMessage);