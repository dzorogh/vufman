import { defineStore } from 'pinia';

export const usePromptStore = defineStore('prompt', {
  state: () => {
    return {
      header: '',
      show: false,
      content: '',
      oldValue: '',
      newValue: '',
      addon: null as string | null,
      errors: [] as string[],
      validateCallback: null as null | (() => boolean)
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
    }
  }
});
