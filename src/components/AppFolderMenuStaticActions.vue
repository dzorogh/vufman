<template>
  <n-button-group size="small">
    <n-upload-trigger
      v-if="nodesStore.currentFolder ? nodesStore.currentFolder.canWrite : true"
      #="{ handleClick }"
      abstract
    >
      <n-button @click="handleClick">
        Загрузить

        <template #icon>
          <IconUpload />
        </template>
      </n-button>
    </n-upload-trigger>

    <n-tooltip
      v-for="(item, index) in staticActions.filter(item => item.show ? item.show() : true)"
      :key="index"
      placement="bottom"
      trigger="hover"
      :disabled="mdAndSmaller"
    >
      <template #trigger>
        <n-button
          size="small"
          @click="item.action"
        >
          <template #icon>
            <n-icon :component="item.icon" />
          </template>
        </n-button>
      </template>

      <span v-html="item.label" />
    </n-tooltip>
  </n-button-group>
</template>

<script setup lang="ts">
import {
  DocumentAdd16Filled as IconMakeFile,
  FolderAdd16Filled as IconMakeFolder,
  CloudArrowUp16Filled as IconUpload,
} from "@vicons/fluent";
import { useNodesStore } from "@/store/nodes";
import { useRoute } from "vue-router";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

const route = useRoute();
const nodesStore = useNodesStore();
const breakpoints = useBreakpoints(breakpointsTailwind);
const mdAndSmaller = breakpoints.smaller('md');

const staticActions = [
  {
    show: () => nodesStore.currentFolder ? nodesStore.currentFolder.canWrite : true,
    label: 'Новая папка <kbd>СTRL/CMD</kbd>+<kbd>ALT</kbd>+<kbd>N</kbd>',
    icon: IconMakeFolder,
    action: nodesStore.makeFolder,
  },
  {
    show: () => nodesStore.currentFolder ? nodesStore.currentFolder.canWrite : true,
    label: 'Создать текстовый файл <kbd>СTRL/CMD</kbd>+<kbd>ALT</kbd>+<kbd>F</kbd>',
    icon: IconMakeFile,
    action: nodesStore.makeFile,
  },
];

</script>

<style scoped>

</style>
