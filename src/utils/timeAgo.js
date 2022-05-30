const times = [
  {label: 'year', amount: 365 * 24 * 3600 * 1000},
  {label: 'month', amount: 30 * 24 * 3600 * 1000},
  {label: 'week', amount: 7 * 24 * 3600 * 1000},
  {label: 'day', amount: 24 * 3600 * 1000},
  {label: 'hour', amount: 3600 * 1000},
  {label: 'minute', amount: 60 * 1000},
  {label: 'second', amount: 1000},
];

export const timeAgo = (ms) => {
  if (isNaN(ms)) return '???';
  for (const {label, amount} of times) {
    if (amount <= ms) {
      const v = Math.floor(ms / amount);
      return `${v} ${label}${v === 1 ? '' : 's'} ago`;
    }
  }
  return 'just now';
};
