import { TOrderStatus } from '../interfaces/order';

export function parseStatus(status: TOrderStatus): string | undefined {
  if (status === 'done') {
    return 'Выполнен';
  } else if (status === 'created') {
    return 'Создан';
  } else if (status === 'pending') {
    return 'Готовится';
  }
}
