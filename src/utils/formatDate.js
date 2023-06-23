function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function formatFullDate(date) {
  const options = { month: 'long', day: 'numeric' };
  return date.toLocaleDateString('ru-RU', options);
}

function formatTime(date) {
  const options = { hour: '2-digit', minute: '2-digit' };
  return date.toLocaleTimeString('ru-RU', options);
}

export function formatDate(str) {
  const date = new Date(str);
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (isSameDay(date, now)) {
    return `Сегодня, ${formatTime(date)} i-GMT+3`;
  } else if (isSameDay(date, yesterday)) {
    return `Вчера, ${formatTime(date)} i-GMT+3`;
  } else {
    return `${formatFullDate(date)}, ${formatTime(date)} i-GMT+3`;
  }
}
