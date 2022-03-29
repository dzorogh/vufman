import { ActionType } from "@/types/ActionType";

export const actions: { [key in ActionType]: string } = {
  upload: 'Загрузка',
  create: 'Создание',
  move: 'Перемещение',
  paste: 'Вставка',
  download: 'Скачивание',
  destroy: 'Удаление безвозвратно',
  delete: 'Удаление в корзину',
  emptyTrash: 'Очистка корзины',
  rename: 'Переименование',
  restore: 'Восстановление',
};
