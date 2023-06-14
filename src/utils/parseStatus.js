export function parseStatus(status) {
  if (status === 'done') {
    return 'Выполнен';
  } else if (status === 'created') {
    return 'Создан';
  } else if (status === 'pending') {
    return 'Готовится';
  }
}
