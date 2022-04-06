import { ActionType } from "@/types/ActionType";

export const actions: { [key in ActionType]: string } = {
  upload: 'Загрузка',
  create: 'Создание',
  move: 'Перемещение',
  paste: 'Вставка',
  delete: 'Удаление безвозвратно',
  trash: 'Удаление в корзину',
  untrash: 'Восстановление из корзины',
  emptyTrash: 'Очистка корзины',
  rename: 'Переименование',
  saveComment: 'Сохранение комментария',
  saveAccess: 'Сохранение доступов',
  saveContent: 'Сохранение файла',
};
