export function getAvatarImage(avatarSrc: string | null): string {
  if (!avatarSrc) {
    return 'https://a.deviantart.net/avatars/r/o/roanovel.png?5'
  }

  return process.env.IMG_ENDPOINT + avatarSrc;
}