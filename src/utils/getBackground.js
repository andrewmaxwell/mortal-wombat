export const getBackground = (type) =>
  type?.image ? `no-repeat center/contain url(${type.image})` : type?.color;
