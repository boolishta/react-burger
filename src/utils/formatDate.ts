function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function formatFullDate(date: Date) {
  return date.toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' });
}

function formatTime(date: Date) {
  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDate(str: string): string {
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
