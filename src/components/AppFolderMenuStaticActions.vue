<template>
  <n-button-group>
    <n-upload-trigger
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
      v-for="(item, index) in staticActions"
      :key="index"
      placement="bottom"
      trigger="hover"
    >
      <template #trigger>
        <n-button
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

const route = useRoute();
const nodesStore = useNodesStore();

const staticActions = [
  {
    show: () => true,
    label: 'Новая папка <kbd>СTRL/CMD</kbd>+<kbd>ALT</kbd>+<kbd>N</kbd>',
    icon: IconMakeFolder,
    action: nodesStore.makeFolder,
  },
  {
    show: () => true,
    label: 'Создать текстовый файл <kbd>СTRL/CMD</kbd>+<kbd>ALT</kbd>+<kbd>F</kbd>',
    icon: IconMakeFile,
    action: nodesStore.makeFile,
  },
];

</script>

<style scoped>

</style>
