<template>
  <n-button-group>
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
import { DocumentAdd24Filled, FolderAdd28Filled } from "@vicons/fluent";
import { useNodesStore } from "@/store/nodes";

const nodesStore = useNodesStore();

const staticActions = [
  {
    show: () => true,
    label: 'Новая папка <kbd>СTRL/CMD</kbd>+<kbd>ALT</kbd>+<kbd>N</kbd>',
    icon: FolderAdd28Filled,
    action: nodesStore.makeFolder,
  },
  {
    show: () => true,
    label: 'Создать текстовый файл <kbd>СTRL/CMD</kbd>+<kbd>ALT</kbd>+<kbd>F</kbd>',
    icon: DocumentAdd24Filled,
    action: nodesStore.makeFile,
  },
];
</script>

<style scoped>

</style>
