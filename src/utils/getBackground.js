export const getBackground = (type) => ({
  background: type.image
    ? `no-repeat center/contain url(${type.image})`
    : type.color,
});
