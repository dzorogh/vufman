import { useConfirmStore } from "@/store/confirm";
import { INodeModel } from "@/types/INodeModel";

export function useDeleteAction() {
  const confirmStore = useConfirmStore();

  return {
    show(nodes: INodeModel[], isForced?: true) {
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
            label: item.getFullName(),
            icon: item.isFolder ? 'pi pi-fw pi-folder' : 'pi pi-fw pi-file'
          };
        });
      } else {
        if (isForced) {
          confirmStore.content = (nodes[0].isFolder ? `Удалить навсегда со всем содержимым папку ` : `Удалить навсегда файл `);
        } else {
          confirmStore.content = (nodes[0].isFolder ? `Переместить в корзину папку ` : `Переместить в корзину файл `);
        }

        confirmStore.content += `«` + nodes[0].getFullName() + `»?`;

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
