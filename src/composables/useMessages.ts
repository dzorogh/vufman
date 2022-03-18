import { INodeModel } from "@/types/INodeModel";
import { useToast } from "vue-toastification";

const getNodesNames = (nodes: INodeModel[]) => {
  return nodes.map(n => n.getFullName()).join(', ');
};

export function useMessages() {
  const toast = useToast();

  return {

    moved: (
      destinationType: 'folder' | 'trash' | 'root',
    ) => {
      let summary = '';
      let icon = '';

      if (destinationType === 'folder') {
        summary = 'Объекты перемещены';
        icon = 'pi pi-folder';
      }

      if (destinationType === 'trash') {
        summary = 'Объекты перемещены в корзину';
        icon = 'pi pi-trash';
      }

      if (destinationType === 'root') {
        summary = 'Объекты перемещены в корневой каталог';
        icon = 'pi pi-home';
      }

      toast.success(summary, { icon });
    },

    destroyed: () => {
      toast.success('Объекты удалены навсегда', { icon: 'pi pi-trash' });
    }
  };
}
