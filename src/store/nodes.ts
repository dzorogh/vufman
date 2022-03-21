import { defineStore } from 'pinia';
import { useDeleteAction } from "@/composables/useDeleteAction";
import { useRenameAction } from "@/composables/useRenameAction";
import { useMoveAction } from "@/composables/useMoveAction";
import { INodeModel } from "@/types/INodeModel";
import { useMakeFolderAction } from "@/composables/useMakeFolderAction";
import { NodeModel } from "@/models/NodeModel";
import { useMessages } from "@/composables/useMessages";
import { useStorage } from "@vueuse/core";
import { useMakeFileAction } from "@/composables/useMakeFileAction";
import { useRouter } from "vue-router";

const messages = useMessages();

export const useNodesStore = defineStore('nodes', {
  state: () => {
    return {
      nodesLoading: false,
      currentFolder: null as INodeModel | null,
      nodes: [] as INodeModel[],
      selectedNodes: [] as INodeModel[],
      copiedNodes: [] as INodeModel[],
      isCutNodes: false,
      dragging: false,
      layout: useStorage('nodesLayout', 'list')
    };
  },
  actions: {
    deselect() {
      this.selectedNodes = [];
    },

    selectNodeSingle(node: INodeModel) {
      this.selectedNodes = [ node ];
    },

    selectAllNodes() {
      if (this.selectedNodes.length < this.nodes.length) {
        this.selectedNodes = [ ...this.nodes ];
        messages.selectedAll();
      }
    },

    selectNodeAdd(node: INodeModel, toggle = true) {
      const index = this.selectedNodes.indexOf(node);

      if (index < 0) {
        this.selectedNodes.push(node);
      } else {
        if (toggle) {
          this.selectedNodes.splice(index, 1);
        }
      }
    },

    selectNodeRange(node: INodeModel) {
      if (this.selectedNodes.length <= 0) {
        this.selectedNodes = [ node ];
      } else {
        if (this.nodes) {

          const firstNodeIndex = this.sortedNodes.indexOf(this.selectedNodes[0]);
          const lastNodeIndex = firstNodeIndex + this.selectedNodes.length - 1;
          const selectedNodeIndex = this.sortedNodes.indexOf(node);

          this.deselect();

          // Select all nodes between first and selected node
          // Including edge items
          this.sortedNodes.forEach((item, index) => {
            if (index >= firstNodeIndex && index <= selectedNodeIndex) {
              this.selectedNodes.push(item);
            }

            if (index >= selectedNodeIndex && index <= lastNodeIndex) {
              this.selectedNodes.push(item);
            }
          });
        }
      }
    },

    async renameNode() {
      const renameAction = useRenameAction();

      const selectedNode = this.selectedNodes[0];

      const result = await renameAction.show(selectedNode);

      if (result) {
        // console.log(this.nodes[this.nodes.indexOf(selectedNode)]);
        this.nodes[this.nodes.indexOf(selectedNode)].name = result;

        // TODO: API - save changes

        messages.nodeRenamed();
      }

      this.deselect();
    },

    removeNodes(nodes: INodeModel[]) {
      nodes.forEach((node) => {
        this.nodes.splice(this.nodes.indexOf(node), 1);
      });
    },

    async deleteNodes() {
      const deleteAction = useDeleteAction();

      const result = await deleteAction.show(this.selectedNodes);

      if (result === true) {
        // TODO: API - save changes

        messages.moved('trash');
        this.removeNodes(this.selectedNodes);
      }

      this.deselect();
    },

    async destroyNodes() {
      const deleteAction = useDeleteAction();

      const result = await deleteAction.show(this.selectedNodes, true);

      if (result === true) {
        // TODO: API - save changes
        messages.destroyed();
        this.removeNodes(this.selectedNodes);
      }

      this.deselect();
    },

    async downloadNodes() {
      alert('download');
      messages.downloadStarted();

      this.deselect();
    },

    async copyNodes() {

      if (this.selectedNodes.length) {
        this.isCutNodes = false;
        this.copiedNodes = this.selectedNodes;
        messages.nodesCopied();

        this.deselect();
      }

    },

    async cutNodes() {
      if (this.selectedNodes.length) {
        this.isCutNodes = true;
        this.copiedNodes = this.selectedNodes;

        messages.nodesWereCut();

        this.deselect();
      }
    },

    async pasteNodes() {
      if (this.copiedNodes.length) {
        this.nodes = [ ...this.copiedNodes, ...this.nodes ];

        if (this.isCutNodes) {
          // TODO: api - move nodes to current folder
          this.removeNodes(this.copiedNodes);
          this.copiedNodes = [];
        } else {
          // TODO: api - copy nodes to current folder
        }

        messages.pasted();

        this.deselect();

        this.isCutNodes = false;
      }
    },

    async moveNodes() {
      // TODO: Make interface

      const moveAction = useMoveAction();

      const result = await moveAction.show(this.selectedNodes);

      messages.moved('folder');

      this.deselect();
    },

    async makeFolder() {
      this.deselect();

      const makeFolderAction = useMakeFolderAction();

      const newFolderName = await makeFolderAction.show();

      if (newFolderName) {
        // TODO: api - get new folder id and ancestors, and valid unique name

        this.nodes.push(new NodeModel({
          id: "9fa314a1-bdf2-48cf-9fc1-908d49ff3c93",
          ancestors: [],
          authorId: 0,
          createdAt: new Date().toDateString(),
          deletedAt: null,
          folderId: this.currentFolder && this.currentFolder.id ? this.currentFolder.id : null,
          isFolder: true,
          isTrashed: false,
          name: newFolderName,
          size: 0,
          updatedAt: null
        }) as INodeModel);

        messages.folderCreated();
      }

    },

    async makeFile() {
      this.deselect();

      const makeFileAction = useMakeFileAction();

      const newFileName = await makeFileAction.show();

      if (newFileName) {
        // TODO: api - get new folder id and ancestors, and valid unique name

        this.nodes.push(new NodeModel({
          id: "8e1f6591-7fb3-4666-9cf1-bd06db05e9ee",
          ancestors: [],
          authorId: 0,
          createdAt: new Date().toDateString(),
          deletedAt: null,
          folderId: this.currentFolder && this.currentFolder.id ? this.currentFolder.id : null,
          isFolder: false,
          isTrashed: false,
          name: newFileName,
          extension: 'txt',
          mimetype: 'text/plain',
          size: 0,
          updatedAt: null
        }) as INodeModel);

        messages.fileCreated();

        await this.router.push({ name: 'file', params: { fileId: "8e1f6591-7fb3-4666-9cf1-bd06db05e9ee" } });
      }
    },
  },

  getters: {
    selectedNodesLabel: (state) => {
      if (state.selectedNodes.length > 1) {
        return 'Выбрано несколько файлов/папок';
      }

      if (state.selectedNodes.length === 1) {
        const singleNode = state.selectedNodes[0];
        return singleNode.extension ? `${singleNode.name}.${singleNode.extension}` : singleNode.name;
      }

      return 'Файлы/папки не выбраны';
    },

    selectedNodesIcon: (state) => {
      if (state.selectedNodes.length > 1) {
        return 'pi pi-fw pi-copy';
      }

      if (state.selectedNodes.length === 1) {
        const singleNode = state.selectedNodes[0];
        return singleNode.isFolder ? 'pi pi-fw pi-folder' : 'pi pi-fw pi-file';
      }

      return 'pi pi-fw';
    },

    isNodeSelected: (state) => {
      return (node: INodeModel) => state.selectedNodes.indexOf(node) >= 0;
    },


    sortedNodes: (state) => {
      if (!state.nodes) {
        return [];
      }

      return [ ...state.nodes ]
        .sort((a: INodeModel, b: INodeModel) => {
          if (a.name && b.name) {
            if (a.name > b.name) {
              return 1;
            }

            if (a.name < b.name) {
              return -1;
            }
          }

          return 0;
        })
        .sort((a: INodeModel, b: INodeModel) => {
          if (a.isFolder !== undefined && b.isFolder !== undefined) {
            if (a.isFolder > b.isFolder) {
              return -1;
            }

            if (a.isFolder < b.isFolder) {
              return 1;
            }
          }


          return 0;
        });
    }
  }
});

