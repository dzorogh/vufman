<template>
  <n-button-group>
    <n-tooltip
      v-for="(item, index) in dynamicActionsFiltered"
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
  ArrowDownload16Filled as IconDownload,
  ClipboardPaste16Filled as IconPaste,
  Delete16Filled as IconDelete,
  DeleteDismiss20Filled as IconDestroy,
  DocumentCopy16Filled as IconCopy,
  FolderArrowRight16Filled as IconMove,
  Rename16Filled as IconRename,
  CheckboxChecked16Filled as IconSelectAll,
  ArrowReset20Filled as IconRestore
} from "@vicons/fluent";

import { computed } from "vue";
import { useNodesStore } from "@/store/nodes";
import { useRoute } from "vue-router";

const nodesStore = useNodesStore();
const route = useRoute();

const dynamicActions = [
  {
    show: () => nodesStore.nodes.length,
    label: 'Выделить все <kbd>СTRL/CMD</kbd>+<kbd>A</kbd>',
    icon: IconSelectAll,
    action: nodesStore.selectAllNodes,
  },
  {
    show: () => nodesStore.selectedNodes.length,
    label: 'Переместить',
    icon: IconMove,
    action: nodesStore.moveNodes
  },
  {
    show: () => nodesStore.selectedNodes.length && !route.meta.isTrash,
    label: 'Копировать <kbd>СTRL/CMD</kbd>+<kbd>C</kbd>',
    icon: IconCopy,
    action: nodesStore.copyNodes
  },
  {
    show: () => nodesStore.copiedNodes.length && !route.meta.isTrash,
    label: 'Вставить <kbd>СTRL/CMD</kbd>+<kbd>V</kbd>',
    icon: IconPaste,
    action: nodesStore.pasteNodes
  },
  {
    show: () => nodesStore.selectedNodes.length === 1 && !route.meta.isTrash,
    label: 'Переименовать',
    icon: IconRename,
    action: nodesStore.renameNode
  },
  {
    show: () => nodesStore.selectedNodes.length && !route.meta.isTrash,
    label: 'Скачать',
    icon: IconDownload,
    action: nodesStore.downloadNodes
  },
  {
    show: () => nodesStore.selectedNodes.length && !route.meta.isTrash,
    label: 'Переместить в корзину',
    icon: IconDelete,
    action: nodesStore.deleteNodes
  },
  {
    show: () => nodesStore.selectedNodes.length && route.meta.isTrash,
    label: 'Удалить навсегда',
    icon: IconDestroy,
    action: nodesStore.destroyNodes
  },
  {
    show: () => nodesStore.selectedNodes.length && route.meta.isTrash,
    label: 'Восстановить',
    icon: IconRestore,
    action: nodesStore.restoreNodes
  }
];

const dynamicActionsFiltered = computed(() => {
  return dynamicActions.filter(item => item.show());
});
</script>

<style scoped>

</style>
