import { useMessage } from "naive-ui";

export function useMessages() {
  const toast = useMessage();

  return {

    moved: (
      destinationType: 'folder' | 'trash' | 'root',
    ) => {
      let summary = '';

      if (destinationType === 'folder') {
        summary = 'Перемещено в папку';
      }

      if (destinationType === 'trash') {
        summary = 'Перемещено в корзину';
      }

      if (destinationType === 'root') {
        summary = 'Перемещено в корневой каталог';
      }

      toast.success(summary);
    },

    destroyed: () => {
      toast.success('Удалено навсегда');
    },

    folderCreated: () => {
      toast.success('Создана папка');
    },

    fileCreated: () => {
      toast.success('Создан файл');
    },

    nodeRenamed: () => {
      toast.success('Название сохранено');
    },

    nodesRestored: () => {
      toast.success('Восстановлено');
    },

    downloadStarted: () => {
      toast.success('Скачивание началось');
    },

    nodesCopied: () => {
      toast.success('Скопировано');
    },

    nodesWereCut: () => {
      toast.success('Вырезано');
    },

    pasted: () => {
      toast.success('Вставлено');
    },

    fileSaved: () => {
      toast.success('Файл сохранен');
    },

    selectedAll: () => {
      toast.success('Выбраны все объекты');
    }
  };
}
