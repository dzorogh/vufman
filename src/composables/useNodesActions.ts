import { INodeModel } from "@/types/INodeModel";
import { useMessages } from "@/composables/useMessages";
import { useRenameInteraction } from "@/composables/useRenameInteraction";
import { useApi } from "@/composables/useApi";
import { useDeleteInteraction } from "@/composables/useDeleteInteraction";
import { downloadFile } from "@/services/downloadFile";
import { useMoveInteraction } from "@/composables/useMoveInteraction";
import { useMakeFolderInteraction } from "@/composables/useMakeFolderInteraction";
import { useMakeFileInteraction } from "@/composables/useMakeFileInteraction";
import { useRouter } from "vue-router";

export function useNodesActions() {
  const messages = useMessages();
  const renameInteraction = useRenameInteraction();
  const deleteInteraction = useDeleteInteraction();
  const moveInteraction = useMoveInteraction();
  const makeFolderInteraction = useMakeFolderInteraction();
  const makeFileInteraction = useMakeFileInteraction();
  const router = useRouter();

  const api = useApi();

  return {
    /**
     * Enter new name, rename, return updated node
     *
     * @param node
     */
    async rename(node: INodeModel) {

      const result = await renameInteraction.show(node);

      if (result) {
        const updatedNode = await api.rename({
          name: result,
          id: node.id
        });

        if (updatedNode) {
          messages.nodeRenamed();

          return updatedNode;
        }
      }
    },

    /**
     * Show confirmation popup, send delete request, return updated nodes
     *
     * @param nodes
     */
    async delete(nodes: INodeModel[]) {
      const result = await deleteInteraction.show(nodes);
      const ids = nodes.map(i => i.id);

      if (result) {
        const serverResult = await api.delete({ ids });

        if (serverResult) {
          messages.nodesMoved('trash');

          return true;
        }
      }
    },

    /**
     * Show confirmation popup, them send destroy request
     *
     * @param nodes
     */
    async destroy(nodes: INodeModel[]) {
      const result = await deleteInteraction.show(nodes, true);
      const ids = nodes.map(i => i.id);

      if (result) {
        const serverResult = await api.destroy({ ids });

        if (serverResult) {
          messages.nodesDestroyed();

          return true;
        }
      }
    },

    /**
     * Send restore request, return updated nodes
     *
     * @param nodes
     */
    async restore(nodes: INodeModel[]) {
      const ids = nodes.map(i => i.id);

      const serverResult = await api.restore({ ids });

      if (serverResult) {
        messages.nodesRestored();

        return serverResult;
      }
    },

    /**
     * Request single node data and force browser to download it
     *
     * @param node
     */
    async download(node: INodeModel) {
      messages.downloadStarted();

      if (node.isFolder) {
        return false;
      }

      // const blob = await api.download({ id: node.id });

      if (node.src) {
        downloadFile(node.src, node.getFullName());
        return true;
      }

      return false;
    },

    /**
     *  Clone or move nodes to known destination.
     *
     * @param nodes Nodes to move
     * @param destinationFolder Where to move nodes
     * @param isCut If true — will move nodes, else — will clone to new destination
     */
    async paste(nodes: INodeModel[], destinationFolder: INodeModel | null, isCut = false) {
      const ids = nodes.map(i => i.id);
      const destinationId = destinationFolder ? destinationFolder.id : null;

      if (isCut) {
        const result = await api.move({ ids, destinationId });

        if (result) {
          messages.nodesMoved(destinationId ? 'folder' : 'root');

          return result;
        }
      } else {
        const result = await api.paste({ ids, destinationId });

        if (result) {
          messages.nodesPasted();

          return result;
        }
      }
    },

    /**
     * Select destination folder, move nodes to it and return updated nodes
     *
     * @param nodes
     */
    async move(nodes: INodeModel[]) {
      const destinationId = await moveInteraction.show(nodes);
      const ids = nodes.map(i => i.id);

      if (destinationId) {
        const updatedNodes = await api.move({ ids, destinationId: destinationId === 'root' ? null : destinationId });

        if (updatedNodes.length) {
          messages.nodesMoved(destinationId ? 'folder' : 'root');

          return updatedNodes;
        }
      }
    },

    /**
     * Enter folder name, create folder, return folder object
     *
     * @param parentFolder
     */
    async makeFolder(parentFolder: INodeModel | null) {
      const name = await makeFolderInteraction.show();
      const folderId = parentFolder ? parentFolder.id : null;

      if (name) {
        const result = await api.create({ name, folderId, type: 'folder' });

        return result;
      }
    },

    /**
     * Enter file name, create file in parentFolder and redirect to it
     *
     * @param parentFolder
     */
    async makeFile(parentFolder: INodeModel | null) {
      const name = await makeFileInteraction.show();
      const folderId = parentFolder ? parentFolder.id : null;

      if (name) {
        const result = await api.create({ name, folderId, type: 'file' });

        if (result) {
          await router.push({ name: 'file', params: { fileId: result.id } });

          return true;
        }

      }
    },

    /**
     * Save file content and return updated node
     *
     * @param file
     * @param content
     */
    async saveContent(file: INodeModel, content: string) {
      const result = await api.saveContent({
        id: file.id,
        content
      });

      if (result) {
        messages.fileSaved();

        return result;
      }
    },

    /**
     * Save node comment and return updated node
     *
     * @param node
     * @param comment
     */
    async saveComment(node: INodeModel, comment: string) {
      const result = await api.saveComment({
        id: node.id,
        comment
      });

      if (result) {
        messages.commentSaved();

        return result;
      }
    },

    /**
     * Save new access params and return updated node
     *
     * @param node
     * @param access
     */
    async saveAccess(node: INodeModel, access: INodeModel['access']) {
      const result = await api.saveAccess({
        id: node.id,
        access
      });

      if (result) {
        messages.accessSaved();

        return result;
      }
    }

  };
}
