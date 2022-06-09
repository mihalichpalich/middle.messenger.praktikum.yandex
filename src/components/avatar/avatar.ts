import {Block} from "../../core";

interface AvatarProps {
  src: string;
}

export class Avatar extends Block {
  static componentName = 'Avatar';

  constructor({src}: AvatarProps) {
    super({src});
  }

  render() {
    // language=hbs
    return `<img src="http://www.cherkasyoblenergo.com/uploads/posts/2018-02/1519657152_img_508630.png" alt="Аватар" class="avatar">`;
  }
}