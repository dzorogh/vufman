import { INodeModel } from "@/types/INodeModel";
import { useToast } from "primevue/usetoast";

const getNodesNames = (nodes: INodeModel[]) => {
  return nodes.map(n => n.getFullName()).join(', ');
};

export function useMessages() {
  const toast = useToast();

  return {

    moved: (
      destinationType: 'folder' | 'trash' | 'root',
      nodes: INodeModel[]
    ) => {
      let summary = '';

      if (destinationType === 'folder') {
        summary = 'Объекты перемещены';
      }

      if (destinationType === 'trash') {
        summary = 'Объекты перемещены в корзину';
      }

      if (destinationType === 'root') {
        summary = 'Объекты перемещены';
      }

      toast.add({
        severity: 'success',
        summary: summary,
        life: 2000,
        detail: getNodesNames(nodes)
      });
    },

    destroyed: (nodes: INodeModel[]) => {
      toast.add({
        severity: 'success',
        summary: nodes.length > 1 ? 'Объекты удалены' : 'Объект удален',
        life: 2000,
        detail: getNodesNames(nodes)
      });
    }
  };
}
