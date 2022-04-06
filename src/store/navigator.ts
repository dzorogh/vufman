import { defineStore } from 'pinia';
import { makeNavigatorTree } from "@/services/makeNavigatorTree";
import { useApi } from "@/composables/useApi";
import { ITreeNode } from "@/types/ITreeNode";
import { Delete24Filled, Home24Filled } from "@vicons/fluent";
import { markRaw, shallowRef } from "vue";

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

      const nodes = await api.nodes({ isFolder: true, withDescendants: true });
      this.tree[0].children = makeNavigatorTree(nodes, null) || undefined;
      this.isLoading = false;
    }
  }
});

