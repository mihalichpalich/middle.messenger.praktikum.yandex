import {Block} from "@/core";

interface AvatarFormButtonProps extends ClickableItemProps {
  isLoading?: boolean;
}

export class AvatarFormButton extends Block<AvatarFormButtonProps> {
  static componentName = 'AvatarFormButton';

  constructor({onClick, ...props}: AvatarFormButtonProps) {
    super({events: {click: onClick}, ...props});
  }

  render() {
    // language=hbs
    return `
      <button type="submit" class="avatar-form-button" {{#if isLoading}}disabled{{/if}}>
        Добавить аватар
      </button>
    `;
  }
}
