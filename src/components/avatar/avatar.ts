import {Block} from "../../core";

interface AvatarProps {
  avatarSrc: string;
}

export class Avatar extends Block<AvatarProps> {
  static componentName = 'Avatar';

  constructor({avatarSrc}: AvatarProps) {
    super({avatarSrc});
  }

  render() {

    // language=hbs
    return `<img src="{{avatarSrc}}" alt="Аватар" class="avatar">`;
  }
}