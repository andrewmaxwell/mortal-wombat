export const getBackground = (type, prop = 'image') => {
  const url = type?.[prop] || type?.image;
  return url ? `no-repeat center/contain url(${url})` : type?.color;
};
