import {Block} from "@/core";

interface ChatFeatureFormProps extends ClickableItemProps {
  inputName: string;
  buttonText: string;
  placeholder: string;
}

export class ChatFeatureForm extends Block<ChatFeatureFormProps> {
  static componentName = 'ChatFeatureForm';

  constructor(props: ChatFeatureFormProps) {
    super(props);
  }

  render() {
    // language=hbs
    return `
      <div class="chat-feature-form">
        <input type="text" placeholder="{{placeholder}}" name="{{inputName}}" class="chat-feature-form__input">
        {{{ChatFeatureSendButton buttonText=buttonText onClick=onClick}}}
      </div> 
    `
  }
}