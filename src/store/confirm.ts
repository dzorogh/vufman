import { defineStore } from 'pinia';
import { Component } from "vue";
import {
  ErrorCircle16Filled as IconDanger
} from "@vicons/fluent";

export const useConfirmStore = defineStore('confirm', {
  state: () => {
    return {
      icon: IconDanger,
      show: false,
      header: '',
      content: '',
      list: [] as { label: string; icon?: Component }[]
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
