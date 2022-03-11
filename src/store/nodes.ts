import { defineStore } from 'pinia';
import { Node } from "@/types/Node";
import { useDeleteAction } from "@/composables/useDeleteAction";
import { useRenameAction } from "@/composables/useRenameAction";
import { computed } from "vue";

export const useNodesStore = defineStore('nodes', {
  state: () => {
    return {
      currentFolder: null,
      nodes: [] as Node[],
      selectedNodes: [] as Node[],
      copiedNodes: [] as Node[]
    };
  },
  actions: {
    selectNodeSingle(node: Node) {
      this.selectedNodes = [ node ];
    },

    selectNodeAdd(node: Node) {
      this.selectedNodes.push(node);
    },

    selectNodeRange(node: Node) {
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
    },

    async deleteNodes() {
      const deleteAction = useDeleteAction();

      const result = await deleteAction.show(this.selectedNodes);

      if (result === true) {
        this.nodes.forEach((node, nodeIndex) => {
          this.selectedNodes.forEach((selectedNode) => {
            // if (node.id === selectedNode.id) {
            //   this.nodes.splice(nodeIndex, 1);
            // }
            this.nodes.splice(this.nodes.indexOf(selectedNode), 1);
          });
        });

        // TODO: API - save changes
      }
    },

    copyNodes() {
      this.copiedNodes = this.selectedNodes;
    },

    pasteNodes() {
      this.selectedNodes = [];

      // TODO: API - save changes
      this.nodes = [ ...this.copiedNodes, ...this.nodes ];
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
      return (node: Node) => state.selectedNodes.indexOf(node) >= 0;
    },

    sortedNodes: (state) => {
      return [ ...state.nodes ]
        .sort((a: Node, b: Node) => {
          if (a.name > b.name) {
            return 1;
          }

          if (a.name < b.name) {
            return -1;
          }

          return 0;
        })
        .sort((a: Node, b: Node) => {
          if (a.isFolder > b.isFolder) {
            return -1;
          }

          if (a.isFolder < b.isFolder) {
            return 1;
          }

          return 0;
        });
    }
  }
});

