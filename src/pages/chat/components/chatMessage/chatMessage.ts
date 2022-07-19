import {Block, Store} from "@/core";
import {withStore} from "@/utils/withStore";

interface ChatMessageProps {
  store: Store<AppState>;
  text: string;
  messageDate: string;
  stateUserId: number;
  userId: number;
  isOutgoing?: boolean;
}

class ChatMessage extends Block<ChatMessageProps> {
  static componentName = 'ChatMessage';

  constructor(props: ChatMessageProps) {
    super({...props, isOutgoing: props.userId === props.stateUserId});
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

function mapStateToProps(state: AppState) {
  return {
    stateUserId: state.user?.id
  };
}

export default withStore(ChatMessage, mapStateToProps);