import { defineStore } from 'pinia';

export const useConfirmStore = defineStore('confirm', {
  state: () => {
    return {
      icon: 'pi pi-exclamation-triangle',
      show: false,
      header: '',
      content: '',
      list: [] as { label: string; icon?: string }[]
    };
  },
  actions: {
    decline() {
      this.show = false;
    },
    accept() {
      this.show = false;
    }
  }
});
