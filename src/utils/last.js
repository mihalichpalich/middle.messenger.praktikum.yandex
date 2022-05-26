export const last = (list) => {
  if (Array.isArray(list)) {
    if (list.length) {
      return list[list.length - 1];
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};