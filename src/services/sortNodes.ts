import { INodeModel } from "@/types/INodeModel";
import { SortingType } from "@/types/SortingType";

export const sortNodes = (nodes: INodeModel[], sorting: SortingType, sortingDirection: 'asc' | 'desc') => {
  return [ ...nodes ]
    .sort((a: INodeModel, b: INodeModel) => {
      const direction = sortingDirection === 'asc' ? 1 : -1;

      return (b.name || '').localeCompare(a.name || '', 'ru', { numeric: true }) * direction;
    })
    .sort((a: INodeModel, b: INodeModel) => {
      const direction = sortingDirection === 'asc' ? 1 : -1;

      if (sorting === 'name') {
        return (b.name || '').localeCompare(a.name || '', 'ru', { numeric: true }) * direction;
      }

      if (sorting === 'type') {
        if (a.isFolder !== undefined && b.isFolder !== undefined) {
          if (b.isFolder > a.isFolder) {
            return -direction;
          }

          if (b.isFolder < a.isFolder) {
            return direction;
          }
        }

        const aFileType = a.getFileType() || '';
        const bFileType = b.getFileType() || '';

        return aFileType.localeCompare(bFileType) * direction;
      }

      if (sorting === 'size') {
        return ((b.size || 0) - (a.size || 0)) * direction;
      }

      if (sorting === 'create') {
        const aTime = new Date(a.createdAt || 0).getTime();
        const bTime = new Date(b.createdAt || 0).getTime();

        return (bTime - aTime) * direction;
      }

      if (sorting === 'update') {
        const aTime = new Date(a.updatedAt || 0).getTime();
        const bTime = new Date(b.updatedAt || 0).getTime();

        return (bTime - aTime) * direction;
      }

      return 0;
    });
};
