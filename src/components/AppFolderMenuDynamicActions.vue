<template>
  <n-button-group
    size="small"
    class="overflow-auto"
  >
    <n-tooltip
      v-for="(item, index) in dynamicActionsFiltered"
      :key="index"
      placement="bottom"
      trigger="hover"
      :disabled="mdAndSmaller"
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
  ArrowReset20Filled as IconRestore,
  Cut20Filled as IconCut
} from "@vicons/fluent";

import { computed } from "vue";
import { useNodesStore } from "@/store/nodes";
import { useRoute } from "vue-router";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

const nodesStore = useNodesStore();
const route = useRoute();
const props = defineProps<{
  isTrash: boolean;
}>();

const breakpoints = useBreakpoints(breakpointsTailwind);
const mdAndSmaller = breakpoints.smaller('md');

const dynamicActions = [
  {
    show: () => nodesStore.nodes.length,
    label: 'Выделить все <kbd>СTRL/CMD</kbd>+<kbd>A</kbd>',
    icon: IconSelectAll,
    action: nodesStore.selectAllNodes,
  },
  {
    show: () => nodesStore.selectedNodes.length && nodesStore.canWriteSelectedNodes(),
    label: 'Переместить',
    icon: IconMove,
    action: nodesStore.moveNodes
  },
  {
    show: () => nodesStore.selectedNodes.length && !props.isTrash,
    label: 'Копировать <kbd>СTRL/CMD</kbd>+<kbd>C</kbd>',
    icon: IconCopy,
    action: nodesStore.copyNodes
  },
  {
    show: () => nodesStore.selectedNodes.length && !props.isTrash && nodesStore.canWriteSelectedNodes(),
    label: 'Вырезать <kbd>СTRL/CMD</kbd>+<kbd>C</kbd>',
    icon: IconCut,
    action: nodesStore.cutNodes
  },
  {
    show: () => nodesStore.copiedNodes.length && !props.isTrash && (nodesStore.currentFolder ? nodesStore.currentFolder.canWrite : true),
    label: 'Вставить <kbd>СTRL/CMD</kbd>+<kbd>V</kbd>',
    icon: IconPaste,
    action: nodesStore.pasteNodes
  },
  {
    show: () => nodesStore.selectedNodes.length === 1 && !props.isTrash && nodesStore.canWriteSelectedNodes(),
    label: 'Переименовать',
    icon: IconRename,
    action: nodesStore.renameNode
  },
  {
    show: () => nodesStore.selectedNodes.length === 1 && !nodesStore.selectedNodes[0].isFolder,
    label: 'Скачать',
    icon: IconDownload,
    action: nodesStore.downloadNodes
  },
  {
    show: () => nodesStore.selectedNodes.length && !props.isTrash && nodesStore.canWriteSelectedNodes(),
    label: 'Переместить в корзину',
    icon: IconDelete,
    action: nodesStore.trashNodes
  },
  {
    show: () => nodesStore.selectedNodes.length && props.isTrash && nodesStore.canWriteSelectedNodes(),
    label: 'Удалить навсегда',
    icon: IconDestroy,
    action: nodesStore.deleteNodes
  },
  {
    show: () => nodesStore.selectedNodes.length && props.isTrash && nodesStore.canWriteSelectedNodes(),
    label: 'Восстановить',
    icon: IconRestore,
    action: nodesStore.untrashNodes
  }
];

const dynamicActionsFiltered = computed(() => {
  return dynamicActions.filter(item => item.show());
});
</script>

<style scoped>

</style>
