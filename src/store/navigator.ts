import { defineStore } from 'pinia';
import { ITreeNode } from "@/types/ITreeNode";
import { Delete24Filled, Home24Filled } from "@vicons/fluent";
import { markRaw } from "vue";
import { mapNavigatorFolders } from "@/services/mapNavigator";

export const useNavigatorStore = defineStore('navigator', {
  state: () => {
    return {
      tree: [
        {
          label: 'Диск',
          key: 'root',
          icon: markRaw(Home24Filled)
        },
        {
          label: 'Корзина',
          key: 'trash',
          icon: markRaw(Delete24Filled)
        }
      ] as ITreeNode[],
      isLoading: true
    };
  },
  actions: {
    async loadNavigatorTree() {
      const api = this.api;

      const nodesTree = await api.navigator();

      this.tree[0].children = mapNavigatorFolders(nodesTree) || undefined;

      this.isLoading = false;
    }
  }
});

