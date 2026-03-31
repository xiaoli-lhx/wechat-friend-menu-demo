function pad(value) {
  return `${value}`.padStart(2, '0');
}

function normalizeDate(input) {
  if (!input) {
    return new Date();
  }

  if (input instanceof Date) {
    return input;
  }

  if (typeof input === 'number' || typeof input === 'string') {
    return new Date(input);
  }

  if (typeof input === 'object' && input.seconds) {
    return new Date(input.seconds * 1000);
  }

  return new Date();
}

function formatTime(input) {
  const date = normalizeDate(input);

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

module.exports = {
  formatTime,
  normalizeDate
};
