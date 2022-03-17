import { defineStore } from 'pinia';
import { useDeleteAction } from "@/composables/useDeleteAction";
import { useRenameAction } from "@/composables/useRenameAction";
import { useMoveAction } from "@/composables/useMoveAction";
import { INodeModel } from "@/types/INodeModel";

export const useNodesStore = defineStore('nodes', {
  state: () => {
    return {
      nodesLoading: false,
      currentFolder: null as INodeModel | null,
      nodes: [] as INodeModel[],
      selectedNodes: [] as INodeModel[],
      copiedNodes: [] as INodeModel[]
    };
  },
  actions: {
    selectNodeSingle(node: INodeModel) {
      this.selectedNodes = [ node ];
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

          this.selectedNodes = [];

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

        const currentNodeIndex = this.nodes.findIndex((item) => {
          return item.id === selectedNode.id;
        });

        this.nodes[currentNodeIndex].name = result;

        // TODO: API - save changes
      }

      this.selectedNodes = [];
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

        this.removeNodes(this.selectedNodes);
      }

      this.selectedNodes = [];
    },

    async destroyNodes() {
      const deleteAction = useDeleteAction();

      const result = await deleteAction.show(this.selectedNodes, true);

      if (result === true) {
        // TODO: API - save changes

        this.removeNodes(this.selectedNodes);
      }

      this.selectedNodes = [];
    },

    async downloadNodes() {
      alert('download');
      this.selectedNodes = [];
    },

    async copyNodes() {
      this.copiedNodes = this.selectedNodes;

      this.selectedNodes = [];
    },

    async pasteNodes() {
      // TODO: API - save changes
      this.nodes = [ ...this.copiedNodes, ...this.nodes ];
      this.copiedNodes = [];
      this.selectedNodes = [];
    },

    async moveNodes() {
      // TODO: Make interface

      const moveAction = useMoveAction();

      const result = await moveAction.show(this.selectedNodes);

      this.selectedNodes = [];
    },

    async makeFolder() {
      // TODO: Show rename order
      alert('make folder and set name for it');
      this.selectedNodes = [];
    }
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

