import { defineStore } from 'pinia';
import { TreeNode } from "primevue/tree";

const emptyState = {
  header: '',
  show: false,
  content: '',
  type: 'string' as 'string' | 'tree',
  oldValue: '',
  newValue: '',
  addon: null as string | null,
  errors: [] as string[],
  validateCallback: null as null | (() => boolean),
  isLoading: false,
  treeNodes: null as null | TreeNode[]
};

export const usePromptStore = defineStore('prompt', {
  state: () => {
    return {
      ...emptyState
    };
  },
  actions: {
    reset() {
      this.$state = { ...emptyState };
    },
    cancel() {
      this.show = false;
    },
    save() {
      this.show = false;
    },
    validate() {
      if (this.validateCallback) {
        if (this.validateCallback()) {
          this.save();
        }
      } else {
        this.save();
      }
    }
  }
});
