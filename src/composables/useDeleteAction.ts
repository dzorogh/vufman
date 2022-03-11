import { useConfirmStore } from "@/store/confirm";
import { Node } from "@/types/Node";

export function useDeleteAction() {
  const confirmStore = useConfirmStore();

  return {
    show(nodes: Node[]) {
      confirmStore.header = 'Подтвердите удаление';

      if (nodes.length > 1) {
        confirmStore.content = 'Переместить файлы/папки в корзину?';

        confirmStore.list = nodes.map(item => {
          return {
            label: item.extension ? `${item.name}.${item.extension}` : item.name,
            icon: item.isFolder ? 'pi pi-fw pi-folder' : 'pi pi-fw pi-file'
          };
        });
      } else {
        confirmStore.content =
          (nodes[0].isFolder ? `Удалить папку ` : `Удалить файл `)
          + `«` + (nodes[0].extension ? `${nodes[0].name}.${nodes[0].extension}` : nodes[0].name) + `»?`;

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
