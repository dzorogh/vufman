import { defineStore } from 'pinia';
import { ITreeNode } from "@/services/makeNavigatorTree";

export const usePromptStore = defineStore('prompt', {
  state: () => {
    return {
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
      treeNodes: null as null | ITreeNode[]
    };
  },
  actions: {
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
    },
    promiseOnAction() {
      return new Promise<string | false>((resolve) => {
        const unsubscribe = this.$onAction(({ name, after }) => {
          after(() => {
            if (name === 'cancel') {
              resolve(false);
              unsubscribe();
            }

            if (name === 'save') {
              console.log(this.$state);

              if (this.type === 'tree') {
                resolve(this.newValue);
              }

              if (this.type === 'string') {
                resolve(this.newValue);
              }

              unsubscribe();
            }
          });
        });
      });
    }
  }
});
