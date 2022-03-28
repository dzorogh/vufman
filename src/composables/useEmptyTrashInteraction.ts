import { useConfirmStore } from "@/store/confirm";
import { INodeModel } from "@/types/INodeModel";

export function useEmptyTrashInteraction() {
  const confirmStore = useConfirmStore();

  return {
    show() {
      confirmStore.$reset();

      // TODO: Message about 30 days in trash
      confirmStore.header = 'Очистить корзину?';

      confirmStore.content = 'Удалить файлы/папки навсегда?';

      confirmStore.show = true;

      return new Promise((resolve) => {
        confirmStore.$onAction(({ name, after }) => {
          after(() => {
            if (name === 'accept') {
              resolve(true);
            }

            if (name === 'decline') resolve(false);
          });
        });
      });
    }
  };
}
