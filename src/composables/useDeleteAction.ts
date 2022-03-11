import { useConfirmStore } from "@/store/confirm";
import { Node } from "@/types/Node";

export function useDeleteAction() {
  const confirmStore = useConfirmStore();

  return {
    show(nodes: Node[], isForced?: true) {
      // TODO: Message about 30 days in trash
      confirmStore.header = 'Подтвердите удаление';

      if (isForced) {
        confirmStore.header = 'Подтвердите удаление навсегда';
      } else {
        confirmStore.header = 'Подтвердите удаление';
      }

      if (nodes.length > 1) {
        if (isForced) {
          confirmStore.content = 'Переместить файлы/папки в корзину?';
        } else {
          confirmStore.content = 'Удалить файлы/папки навсегда?';
        }

        confirmStore.list = nodes.map(item => {
          return {
            label: item.extension ? `${item.name}.${item.extension}` : item.name,
            icon: item.isFolder ? 'pi pi-fw pi-folder' : 'pi pi-fw pi-file'
          };
        });
      } else {
        if (isForced) {
          confirmStore.content = (nodes[0].isFolder ? `Удалить навсегда со всем содержимым папку ` : `Удалить навсегда файл `);
        } else {
          confirmStore.content = (nodes[0].isFolder ? `Переместить в корзину папку ` : `Переместить в корзину файл `);
        }

        confirmStore.content += `«` + (nodes[0].extension ? `${nodes[0].name}.${nodes[0].extension}` : nodes[0].name) + `»?`;

        confirmStore.list = [];
      }

      confirmStore.show = true;

      return new Promise((resolve) => {
        confirmStore.$onAction(({ name, after }) => {
          after(() => {
            if (name === 'accept') resolve(true);
            if (name === 'decline') resolve(false);
          });
        });
      });
    }
  };
}
